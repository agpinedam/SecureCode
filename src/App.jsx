// src/App.jsx

import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import DateController from './components/DateController';

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <DateController />
      )}
    </div>
  );
};

const RootApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default RootApp;
