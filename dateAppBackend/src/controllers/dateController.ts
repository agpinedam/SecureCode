import { Request, Response } from 'express';
import security from '../utils/security';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const formatDateController = (req: Request, res: Response): void => {
  const { format } = req.body;

  try {
    // Obtener el ID de usuario desde el token JWT usando el middleware de verificación de token
    if (!req.user || typeof req.user === 'string') {
      res.status(401).json({ error: 'No token provided or invalid token' });
      return;
    }

    const userId = (req.user as JwtPayload).id;

    const formattedDate = security.formatDate(format);

    res.status(200).json({ formattedDate, userId });
  } catch (error) {
    console.error('Error formatting date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
