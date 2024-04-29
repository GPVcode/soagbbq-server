import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv'
const app = express();
dotenv.config()

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Replace with your Client ID
    process.env.GOOGLE_CLIENT_SECRET, // Replace with your Client Secret
    'http://localhost:3000/oauth2callback' // Redirect URL
  );

const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

app.get('/auth', (req, res) => {
    res.redirect(url);
  });

app.get('/oauth2callback', async (req, res) => {
  const { tokens } = oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  res.send('Authentication successful! Please return to the console.');
  // Save the token here for future use (not in production)
});

app.get('/events', async (req, res) => {
    const calendar = google.calendar({version: 'v3', auth: oauth2Client});
    try {
      const result = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      const events = result.data.items;
      res.json(events);
    } catch (error) {
      console.error('The API returned an error: ' + error);
      res.status(500).send(error);
    }
  });
  
// Generate a url that asks permissions for the Calendar scope
const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))