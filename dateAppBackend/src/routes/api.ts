import express from 'express';
import { getCurrentDate } from '../controllers/dateController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta protegida que requiere autenticación
router.get('/date', authenticateToken, getCurrentDate);

export default router;
