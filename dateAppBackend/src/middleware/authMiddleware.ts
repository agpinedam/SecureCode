import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized si no hay token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden si hay un error en la verificación del token
    }
    req.user = user as JwtPayload; // Asigna el usuario decodificado al objeto 'user' en 'req'
    next(); // Pasa al siguiente middleware o controlador
  });
};
