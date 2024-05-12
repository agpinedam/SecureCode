// src/components/SetTimeForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SetTimeForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSetTime = async () => {
    try {
      const dateTime = `${date} ${time}`;
      if (!date || !time) {
        alert('Please provide both date and time.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/setTime', {
        dateTime,
      });
      alert(response.data.message); // Mostrar el mensaje de éxito
    } catch (error) {
      console.error('Error setting time:', error);
      alert('Failed to set time');
    }
  };

  return (
    <div>
      <h2>Set System Time</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleSetTime}>
          Set Time
        </button>
      </form>
    </div>
  );
};

export default SetTimeForm;
