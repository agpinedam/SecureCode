// src/app.ts
import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
