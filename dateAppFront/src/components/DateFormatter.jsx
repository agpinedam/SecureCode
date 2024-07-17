// dateAppFrontend/src/components/DateFormatter.jsx

import React, { useState } from 'react';
import { formatDate } from '../services/api';

const DateFormatter = () => {
  const [format, setFormat] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleFormatDate = async () => {
    try {
      const response = await formatDate(format);
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
