// src/components/LoginForm.jsx

import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (usuario === 'user' && password === '123') {
      onLogin(); // Llama a la función onLogin proporcionada por props para iniciar sesión
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
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
