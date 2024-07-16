import { Request, Response } from 'express';
import security from '../utils/security';

export const formatDateController = (req: Request, res: Response): void => {
  const { format } = req.body;

  try {
    // Aquí se obtiene el ID de usuario desde el token JWT usando el middleware de verificación de token
    const userId = security.getUserIdFromToken(req);

    const formattedDate = security.formatDate(format);

    res.status(200).json({ formattedDate, userId });
  } catch (error) {
    console.error('Error formatting date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
