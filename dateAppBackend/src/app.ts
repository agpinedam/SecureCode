import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para parsear el body de las solicitudes como JSON
app.use(express.json());

// Rutas principales de la API
app.use('/api', apiRouter);
app.use('/auth', authRouter); // Ruta para las operaciones de autenticación

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
