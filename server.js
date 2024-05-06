import express from 'express';
import cors from 'cors';

import { config } from './config/index.js'
import { calendarRoute } from './routes/calendarRoutes.js'; 


const app = express();
app.use(cors());
app.use('/calendar', calendarRoute)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = statusCode === 500 ? 'Internal Server Error' : err.message;
  res.status(statusCode).send(errorMessage);
});

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))