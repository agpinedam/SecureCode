import React, { useState } from 'react';
import { formatDate } from '../services/api';

const DateFormatter = () => {
  const [format, setFormat] = useState('');
  const [result, setResult] = useState('');

  const handleFormatDate = async () => {
    try {
      const response = await formatDate(format);
      setResult(response.data);
    } catch (error) {
      console.error('Error al formatear la fecha', error);
    }
  };

  return (
    <div>
      <h2>Format Date</h2>
      <div>
        <label>Format:</label>
        <input
          type="text"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />
      </div>
      <button onClick={handleFormatDate}>Format Date</button>
      {result && <div>Formatted Date: {result}</div>}
    </div>
  );
};

export default DateFormatter;
