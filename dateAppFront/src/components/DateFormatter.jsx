import React, { useState } from 'react';
import { formatDate } from '../services/api';

const DateFormatter = () => {
  const [date, setDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleFormatDate = async () => {
    try {
      const result = await formatDate(date);
      setFormattedDate(result.formattedDate);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleFormatDate}>Format Date</button>
      {formattedDate && <div>Formatted Date: {formattedDate}</div>}
    </div>
  );
};

export default DateFormatter;
