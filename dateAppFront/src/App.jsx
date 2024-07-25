import React, { useState } from 'react';
import Login from './components/Login';
import DateFormatter from './components/DateFormatter';
import SetTimeForm from './components/SetTimeForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <DateFormatter token={token} />
          <SetTimeForm />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;