// src/utils/validateInput.js

export const validateInput = (input) => {
    return input.replace(/[^a-zA-Z0-9\s:-]/g, ''); // Sanitizar entrada
  };
  