import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    username: 'user1',
    password: bcrypt.hashSync('password1', 8)
  }
];

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send('Invalid Password');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: 86400
  });

  res.json({ auth: true, token });
};
