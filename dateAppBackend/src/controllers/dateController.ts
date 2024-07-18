// src/controllers/dateController.ts
import { Request, Response } from 'express';
import security from '../utils/security';

export const formatDateController = (req: Request, res: Response): void => {
  const { format } = req.body;

  try {
    const userId = security.getUserIdFromToken(req); // Obtiene el ID de usuario desde el token

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const formattedDate = security.formatDate(format);

    res.status(200).json({ formattedDate, userId });
  } catch (error) {
    console.error('Error formatting date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
