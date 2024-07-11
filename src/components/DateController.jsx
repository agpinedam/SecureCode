// src/components/DateController.jsx

import React, { useState } from 'react';
import DateFormatter from '../utils/DateFormatter';

function DateController() {
  const [formatoUsuario, setFormatoUsuario] = useState('');
  const [fechaFormateada, setFechaFormateada] = useState('');

  const handleProcesarClick = () => {
    try {
      const formattedDate = DateFormatter.formatearFecha(formatoUsuario);
      setFechaFormateada(`Fecha formateada: ${formattedDate}`);
    } catch (error) {
      setFechaFormateada('El formato ingresado no es válido.');
    }
  };

  const handleFormatChange = (e) => {
    setFormatoUsuario(e.target.value);
  };

  return (
    <div className="DateController">
      <h1>Formato de Fecha</h1>
      <label>Ingrese el formato deseado para la fecha:</label>
      <input
        type="text"
        value={formatoUsuario}
        onChange={handleFormatChange}
      />
      <button onClick={handleProcesarClick}>Procesar</button>
      <label>{fechaFormateada}</label>
    </div>
  );
}

export default DateController;
