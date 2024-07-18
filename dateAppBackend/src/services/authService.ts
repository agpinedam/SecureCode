// src/services/authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByUsername } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const getStoredPasswordHash = async (username: string): Promise<string | null> => {
  const user = getUserByUsername(username);
  return user ? user.password : null;
};
