import express from 'express';
import dotenv from 'dotenv';

import jobsRouter from './routes/jobs.js';
import applicationRouter from './routes/application.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/jobs', jobsRouter);
app.use('/application', applicationRouter);

app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
);
