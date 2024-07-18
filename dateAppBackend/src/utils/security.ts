import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

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

export const getUserIdFromToken = (req: Request): string | undefined => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return undefined;
  }

  const decoded = verifyToken(token);
  return decoded ? decoded.id : undefined;
};
