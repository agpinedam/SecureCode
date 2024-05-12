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

// Ejemplo de uso: puedes reemplazar esto con la lógica del daemon para recibir fechas y ejecutar el script
const dateTime = "2024-07-18 15:00:00";
executeScript(dateTime);

console.log('Daemon is running...');
