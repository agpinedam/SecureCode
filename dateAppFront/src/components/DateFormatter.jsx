import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DateFormatter = ({ token }) => {
  const [format, setFormat] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleFormat = async () => {
    try {
      const response = await axios.post(
        '/api/formatDate',
        { format },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFormattedDate(response.data.formattedDate);
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  };

  return (
    <div>
      <h2>Format Date</h2>
      <input
        type="text"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        placeholder="Enter date format"
      />
      <button onClick={handleFormat}>Format</button>
      {formattedDate && <p>Formatted Date: {formattedDate}</p>}
    </div>
  );
};

DateFormatter.propTypes = {
  token: PropTypes.string.isRequired,
};

export default DateFormatter;
