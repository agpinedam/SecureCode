// src/services/authService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Configuración secreta para la generación de JWT
const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

// Simulamos una base de datos con un usuario
const users: { [key: string]: string } = {
  user1: await bcrypt.hash('SecurePassword123', 10) // Contraseña encriptada
};

export const getStoredPasswordHash = async (username: string): Promise<string | null> => {
  return users[username] || null;
};

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
