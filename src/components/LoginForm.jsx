// src/components/LoginForm.jsx

import React, { useState } from 'react';
import useAuthHook from '../hooks/useAuth';
import { validateInput } from '../utils/validateInput';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthHook();

  const handleLogin = () => {
    const sanitizedUsuario = validateInput(usuario);
    const sanitizedPassword = validateInput(password);

    if (sanitizedUsuario === 'user' && sanitizedPassword === '123') {
      login();
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="LoginForm">
      <h1>Iniciar sesión</h1>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(validateInput(e.target.value))}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(validateInput(e.target.value))}
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
