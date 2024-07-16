import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';

const app = express();

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para parsear el body de las solicitudes como JSON
app.use(express.json());

// Ruta principal de la API
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
