// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import security from '../utils/security';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  const decoded = security.verifyToken(token);

  if (!decoded) {
    return res.status(500).send('Failed to authenticate token');
  }

  (req as any).userId = decoded.username; // Añade el ID de usuario a la solicitud
  next();
};
