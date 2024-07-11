// src/App.jsx

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import DateController from './components/DateController';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <DateController />
      )}
    </div>
  );
}

export default App;
