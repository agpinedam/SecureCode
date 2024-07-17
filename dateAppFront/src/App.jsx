// dateAppFrontend/src/App.jsx

import React from 'react';
import DateFormatter from './components/DateFormatter';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <h1>Date Formatter App</h1>
      <Login />
      <DateFormatter />
    </div>
  );
};

export default App;
