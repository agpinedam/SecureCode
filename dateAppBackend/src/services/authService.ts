import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';

// No puedes usar await directamente fuera de una función asincrónica
// Por lo tanto, debes inicializar users dentro de una función asincrónica
const initializeUsers = async () => {
  const hashedPassword = await bcrypt.hash('123456', 10); // Hashed password
  return {
    user1: hashedPassword
  };
};

let users: { [key: string]: string } = {};

// Llama a initializeUsers dentro de una función asincrónica para inicializar users
initializeUsers().then((initializedUsers) => {
  users = initializedUsers;
});

export const getStoredPasswordHash = async (username: string): Promise<string | null> => {
  return users[username] || null;
};

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
