// src/controllers/timeController.ts
import { Request, Response } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ruta al script bash
const scriptPath = path.resolve(__dirname, '../../src/scripts/set-time.sh');

export const setTimeController = (req: Request, res: Response): void => {
  const { dateTime } = req.body;

  if (!dateTime) {
    return res.status(400).json({ error: 'Date and time are required' });
  }

  // Verifica si el script tiene permisos de ejecución
  fs.access(scriptPath, fs.constants.X_OK, (err) => {
    if (err) {
      // Si el script no tiene permisos de ejecución, intentamos asignarlos
      fs.chmod(scriptPath, 0o755, (chmodErr) => {
        if (chmodErr) {
          console.error('Failed to set execute permissions:', chmodErr);
          return res.status(500).json({ error: 'Failed to set execute permissions', details: chmodErr });
        }

        console.log('Execute permissions set successfully');
        executeScript(dateTime, res);
      });
    } else {
      // Si ya tiene permisos de ejecución, simplemente ejecutamos el script
      executeScript(dateTime, res);
    }
  });
};

const executeScript = (dateTime: string, res: Response): void => {
  // Escapa el argumento para prevenir inyecciones de comandos
  const escapedDateTime = dateTime.replace(/"/g, '\\"');
  const command = `bash ${scriptPath} "${escapedDateTime}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error setting time:', stderr);
      return res.status(500).json({ error: 'Failed to set time', details: stderr });
    }

    res.status(200).json({ message: 'Time set successfully', output: stdout });
  });
};
