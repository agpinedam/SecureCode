// src/controllers/dateController.ts
import { Request, Response } from 'express';
import security from '../utils/security';

const sanitizeDateFormat = (format: string): string => {
  // Permite solo ciertos caracteres para evitar inyecciones
  return format.replace(/[^yMdHms\-/.]/g, ''); // Ajustado para permitir el guion (-)
};

export const formatDateController = (req: Request, res: Response): void => {
  let { format } = req.body;

  // Sanitiza el formato de la fecha
  format = sanitizeDateFormat(format);

  try {
    const userId = security.getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Genera la fecha formateada
    const formattedDate = security.formatDate(format);

    res.status(200).json({ formattedDate, userId });
  } catch (error) {
    console.error('Error formatting date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
