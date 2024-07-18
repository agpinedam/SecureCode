// src/utils/security.ts

// src/utils/security.ts

import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request } from 'express';

// Configuración secreta para la generación de JWT
const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

// Función para generar un token JWT
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Función para verificar y decodificar un token JWT
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

// Función para encriptar una contraseña
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Función para comparar una contraseña en texto plano con una contraseña encriptada
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// Función para formatear la fecha según el formato dado
export const formatDate = (format: string): string => {
  const currentDate = new Date();

  return format
    .replace(/yyyy/g, currentDate.getFullYear().toString())
    .replace(/yy/g, String(currentDate.getFullYear()).slice(-2))
    .replace(/MM/g, String(currentDate.getMonth() + 1).padStart(2, '0'))
    .replace(/dd/g, String(currentDate.getDate()).padStart(2, '0'))
    .replace(/HH/g, String(currentDate.getHours()).padStart(2, '0'))
    .replace(/mm/g, String(currentDate.getMinutes()).padStart(2, '0'))
    .replace(/ss/g, String(currentDate.getSeconds()).padStart(2, '0'));
};

// Middleware para obtener el ID de usuario desde el token JWT
export const getUserIdFromToken = (req: Request): string | undefined => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return undefined;
  }

  const decoded: any = verifyToken(token);
  return decoded ? decoded.id : undefined;
};

// Exporta todas las funciones y constantes necesarias
export default {
  generateToken,
  verifyToken,
  encryptPassword,
  comparePasswords,
  formatDate,
  getUserIdFromToken
};