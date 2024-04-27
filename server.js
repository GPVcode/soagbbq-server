import express from 'express';
import { google } from 'googleapis';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))