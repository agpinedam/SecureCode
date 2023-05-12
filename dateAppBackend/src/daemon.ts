// src/daemon.ts
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

// Ruta al script bash
const scriptPath = path.resolve(__dirname, 'scripts/set-time.sh');

// Función para ejecutar el script bash
const executeScript = (dateTime: string) => {
  // Escapa el argumento para prevenir inyecciones de comandos
  const escapedDateTime = dateTime.replace(/"/g, '\\"');
  const command = `bash ${scriptPath} "${escapedDateTime}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error setting time:', stderr);
      return;
    }
    console.log('Time set successfully:', stdout);
  });
};


console.log('Daemon is running...');
