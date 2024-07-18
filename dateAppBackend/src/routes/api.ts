// src/routes/api.ts
import { Router } from 'express';
import { formatDateController } from '../controllers/dateController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Ruta para formatear la fecha
router.post('/formatDate', verifyToken, formatDateController);

export default router;
