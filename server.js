import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv'
const app = express();
dotenv.config()

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))