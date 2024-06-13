import { google } from "googleapis";
import { GoogleAuth } from 'google-auth-library';
import { config } from "../config/index.js";

const serviceAccountCredentialsJson = Buffer.from(config.serviceAccountCredentials, 'base64').toString();
const credentials = JSON.parse(serviceAccountCredentialsJson);

const serviceAuth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth: serviceAuth });

let cachedEvents = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000;  // 30 day in milliseconds

const formatEventDates = (event) => {
    const formattedEvent = { ...event };
    const startDate = new Date(event.start.dateTime || event.start.date).toLocaleDateString("en-US", { month: "long", day: "numeric" });
    const endDate = new Date(event.end.dateTime || event.end.date).toLocaleDateString("en-US", { month: "long", day: "numeric" });
    formattedEvent.start = startDate;
    formattedEvent.end = endDate;
    formattedEvent.description = event.description && event.description.toLowerCase() !== 'undefined' ? event.description : '';
    return formattedEvent;
};

const refreshEvents = async () => {
    try {
        console.log("Refreshing events...");
        const result = await calendar.events.list({
            calendarId: config.calendarID,
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
            fields: 'items(id,summary,description,start,end,attachments,updated)',
        });

        cachedEvents = result.data.items.map(formatEventDates);
        cacheTimestamp = Date.now();
        console.log("Events refreshed successfully");
        return cachedEvents;
    } catch (error) {
        console.error('Failed to refresh events:', error);
        cachedEvents = null;
        cacheTimestamp = 0;
    }
};

export const listEvents = async () => {
    const now = Date.now();

    if (cachedEvents && (now < cacheTimestamp + CACHE_DURATION)) {
        console.log("Returning cached events");
        return cachedEvents;
    }

    // Trigger background refresh
    const events = await refreshEvents();

    // If refresh fails, fall back to existing cache
    if (!events) {
      console.log("Returning previous cached events");
      return cachedEvents;
    }

    return events;
};