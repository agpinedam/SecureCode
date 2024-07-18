// src/controllers/timeController.ts
import { Request, Response } from 'express';
import { exec } from 'child_process'; // Usaremos exec para ejecutar el comando de sistema

export const setTimeController = (req: Request, res: Response): void => {
  const { dateTime } = req.body;

  if (!dateTime) {
    return res.status(400).json({ error: 'Date and time are required' });
  }

  // Convertimos la fecha y hora en el formato adecuado para el comando del sistema
  const command = `sudo date -s "${dateTime}"`; // Necesitarás permisos de sudo para esto

  exec(command, (error) => {
    if (error) {
      console.error('Error setting time:', error);
      return res.status(500).json({ error: 'Failed to set time' });
    }

    res.status(200).json({ message: 'Time set successfully' });
  });
};
