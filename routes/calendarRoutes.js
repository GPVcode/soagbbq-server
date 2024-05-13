import express from 'express';
import { listEvents } from '../services/googleCalendarService.js';

const router = express.Router();

router.get('/events', async (req, res) => {
    try{
        // data is filtered in calendar service
        const events = await listEvents();
        console.log("Events retried!");
        res.json(events);
    } catch(error){
        console.error('Error retrieving events:', error);
        res.status(500).json({ message: 'Failed to retrieve events', error: error.message });
    }
});

export { router as calendarRoute };
