// src/models/userModel.ts
import bcrypt from 'bcryptjs';

// Simulamos una base de datos con un usuario
const users = [
  {
    username: 'user1',
    password: bcrypt.hashSync('SecurePassword123', 10) // Contraseña encriptada
  }
];

export const getUserByUsername = (username: string) => {
  return users.find(user => user.username === username);
};
