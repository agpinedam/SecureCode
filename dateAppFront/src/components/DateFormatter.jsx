import React, { useState } from 'react';
import axios from 'axios';

const DateFormatter = () => {
  const [format, setFormat] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const apiUrl = 'http://localhost:5000/api'; // Cambia esto si tu API tiene una URL diferente

  const handleFormatDate = async () => {
    try {
      const response = await axios.post(`${apiUrl}/formatDate`, { format });
      setFormattedDate(response.data.formattedDate);
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter date format"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
      />
      <button onClick={handleFormatDate}>Format Date</button>
      <p>Formatted Date: {formattedDate}</p>
    </div>
  );
};

export default DateFormatter;
