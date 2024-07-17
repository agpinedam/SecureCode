// dateAppBackend/src/controllers/authController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const loginController = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === 'user' && password === '123') {
    const token = jwt.sign({ id: username }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return res.json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};
