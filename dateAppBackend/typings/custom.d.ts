import { Request } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload; // O el tipo específico de tu payload JWT
    }
  }
}
