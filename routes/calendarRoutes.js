import express from 'express';

const router = express.Router();

import { listEvents } from '../services/googleCalendarService.js';

router.get('/events', async (req, res) => {
    try{
        // data is filtered in calendar service
        const events = await listEvents();
        res.json(events);
    } catch(error){
        console.error('Error retrieving events:', error);
        res.status(500).json({ message: 'Failed to retrieve events', error: error.message });
    }
});

export { router as calendarRoute };
