// src/utils/DateFormatter.js

const DateFormatter = {
    formatearFecha: (formato) => {
      const currentDate = new Date();
  
      try {
        return formato
          .replace(/yyyy/g, currentDate.getFullYear())
          .replace(/yy/g, String(currentDate.getFullYear()).slice(-2))
          .replace(/MM/g, String(currentDate.getMonth() + 1).padStart(2, '0'))
          .replace(/dd/g, String(currentDate.getDate()).padStart(2, '0'))
          .replace(/HH/g, String(currentDate.getHours()).padStart(2, '0'))
          .replace(/mm/g, String(currentDate.getMinutes()).padStart(2, '0'))
          .replace(/ss/g, String(currentDate.getSeconds()).padStart(2, '0'));
      } catch (error) {
        throw new Error('El formato ingresado no es válido.');
      }
    }
  };
  
  export default DateFormatter;
  