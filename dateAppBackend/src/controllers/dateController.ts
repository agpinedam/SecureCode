// Ejemplo en un controlador (dateController.ts)

import { Request, Response } from 'express';

export const getCurrentDate = (req: Request, res: Response) => {
  if (req.user) {
    const currentDate = new Date().toDateString();
    res.json({ date: currentDate, user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
