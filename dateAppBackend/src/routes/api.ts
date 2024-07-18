import { Router } from 'express';
import { formatDateController } from '../controllers/dateController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/formatDate', verifyToken, formatDateController);

export default router;
