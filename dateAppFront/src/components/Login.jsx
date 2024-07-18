// src/components/Login.jsx

import React, { useState } from 'react';
import { loginUser } from '../services/api'; // Asegúrate de importarlo correctamente

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log('Login successful:', data);
      // Manejar el éxito del login aquí, por ejemplo, redirigiendo a otra página
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Login;
