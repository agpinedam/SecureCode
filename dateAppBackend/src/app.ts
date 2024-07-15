import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
