// Initiating OAuth2 authentication by generating an authentication URL.
// Handling the OAuth2 callback to exchange an authorization code for tokens.
// Fetching calendar events using authenticated API calls.

import { google } from "googleapis";
import { GoogleAuth } from 'google-auth-library';
import { config } from "../config/index.js";

// Service account for server-to-server interaction
const serviceAuth = new GoogleAuth({
    keyFile: config.serviceAccountKeyFile, // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
  });

// fetch list of calendar events from user's primary Google Calendar.
export const listEvents = async () => {
  const calendar = google.calendar({version: 'v3', auth: serviceAuth}); // creates instance of Google Calendar API client using GoogleAuth
  try{
    const result = await calendar.events.list({
      calendarId: config.calendarID,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return result.data.items;
  } catch (error) {
    console.error('Failed to list events', error);
    throw new Error('Failed to list events');
  }
}