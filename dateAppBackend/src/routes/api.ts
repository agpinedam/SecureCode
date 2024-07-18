// src/routes/api.ts
import { Router } from 'express';
import { formatDateController } from '../controllers/dateController';
import { loginController } from '../controllers/authController';
import { setTimeController } from '../controllers/timeController'; // Importar el controlador de tiempo

const router = Router();

router.post('/login', loginController);
router.post('/formatDate', formatDateController);
router.post('/setTime', setTimeController); // Agregar la ruta para configurar la hora

export default router;
