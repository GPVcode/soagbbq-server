# Son of a Gun BBQ Events Server

This project implements a Node.js server for the Son of a Gun BBQ's website to fetch and display events from Google Calendar via Google Calendar API. It uses OAuth2 authentication for secure access and a service account for server-to-server interactions.

## Project Structure

- `server.js`: The main server file that initializes and runs the Express server.
- `/config/index.js`: Contains configuration settings for the server, such as port and Google API credentials.
- `/keys/`: Directory storing the encrypted Google service account key file.
- `/routes/calendarRoutes.js`: Defines routes for handling requests related to Google Calendar events.
- `/services/googleCalendarService.js`: Contains the logic for Google Calendar API interactions, including authentication and fetching events.

## Features

- OAuth2 Authentication
- Google Calendar API Integration
- Server-to-server authentication using Google Service Accounts
- Environment-based configuration for security and scalability

## Endpoints

- **GET /events**: Fetches and returns a list of upcoming events from the configured Google Calendar.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your enhancements.