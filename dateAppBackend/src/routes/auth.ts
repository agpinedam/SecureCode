import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const users = [{ username: 'user1', passwordHash: '$2a$10$Q2ivlEYy4I2S.4Yr1X6SOu7jQ8K6P8Dd5rwX09DzQiaX8lZ1X87My' }];

router.post('/login', (req, res) => {
  // Autenticación de usuario
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send('Usuario no encontrado');
  }

  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if (err || !result) {
      return res.status(401).send('Credenciales inválidas');
    }

    // Generación del token JWT
    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET as string);
    res.json({ accessToken }); // Envía el token JWT al cliente
  });
});

export default router;
