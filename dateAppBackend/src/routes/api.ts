import { Router } from 'express';
import { formatDateController } from '../controllers/dateController';

const router = Router();

// Ruta para formatear la fecha
router.post('/formatDate', formatDateController);

export default router;