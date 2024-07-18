import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], // Asegúrate de permitir el encabezado Authorization
};

app.use(cors(corsOptions));

// Middleware para parsear el body de las solicitudes como JSON
app.use(express.json());

// Rutas principales de la API
app.use('/api', apiRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
