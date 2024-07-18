// src/components/DateFormatter.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes desde 'prop-types'
import axios from 'axios';

const DateFormatter = ({ token }) => {
  const [format, setFormat] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const apiUrl = 'http://localhost:5000/api'; // Cambia esto si tu API tiene una URL diferente

  const handleFormatDate = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/formatDate`,
        { format },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token JWT en el encabezado de la solicitud
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

// Define PropTypes para validar las props
DateFormatter.propTypes = {
  token: PropTypes.string.isRequired, // Asegura que 'token' sea una cadena requerida
};

export default DateFormatter;
