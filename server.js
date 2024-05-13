import express from 'express';
import cors from 'cors';
import { config } from './config/index.js'
import { calendarRoute } from './routes/calendarRoutes.js'; 


const app = express();
app.use(cors());
app.use('/calendar', calendarRoute)

app.get('/ping', (req, res) => {
  try {
      console.log('Warm')
      res.send('OK');
  } catch (error) {
      console.error('Ping Error:', error);
      res.status(500).send('Error');
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = statusCode === 500 ? 'Internal Server Error' : err.message;
  res.status(statusCode).send(errorMessage);
});

const port = config.port || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`))