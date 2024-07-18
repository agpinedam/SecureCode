import { Request, Response } from 'express';

export const loginController = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Verifica que el usuario y contraseña sean correctos (en este caso, usuario: "user", contraseña: "123")
  if (username === 'user' && password === '123') {
    // Aquí puedes generar un token JWT si quieres implementar autenticación basada en tokens
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};