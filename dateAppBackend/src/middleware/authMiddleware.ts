// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import security from '../utils/security';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET || 'jwtsecretkey', (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }

    (req as any).userId = (decoded as any).username; // Asegúrate de usar el campo correcto del token
    next();
  });
};
