import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = {
    username: 'user',
    password: await bcrypt.hash('123', 10) // Hash de la contraseña para comparación
  };

  if (username === user.username) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } else {
    res.status(401).json({ message: 'Usuario no encontrado' });
  }
};

export { loginController };
