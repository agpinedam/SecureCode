import { Router } from 'express';
import { formatDateController } from '../controllers/dateController';

const router = Router();

router.post('/formatDate', formatDateController);

export default router;
