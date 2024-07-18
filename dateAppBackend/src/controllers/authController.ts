// src/controllers/authController.ts
import { Request, Response } from 'express';
import { getUserByUsername } from '../models/userModel'; // Ajusta según tu estructura de proyecto
import { generateToken, comparePasswords } from '../utils/security';

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (passwordMatch) {
      const token = generateToken({ username });
      return res.json({ message: 'Login successful', token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
