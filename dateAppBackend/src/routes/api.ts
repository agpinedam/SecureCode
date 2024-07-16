import express from 'express';
import { formatDate } from '../controllers/dateController';

const router = express.Router();

router.post('/format', formatDate);

export default router;
