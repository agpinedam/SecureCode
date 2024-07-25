import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

// Ruta al archivo de configuración
const configPath = path.join(__dirname, '..', 'config', 'port.txt');

// Verifica si el archivo de configuración existe
if (!fs.existsSync(configPath)) {
    console.error('Configuration file not found:', configPath);
    process.exit(1);
}

// Lee el puerto desde el archivo de configuración
const portString = fs.readFileSync(configPath, 'utf8').trim();
const port = parseInt(portString, 10);

// Verifica si el puerto es válido
if (isNaN(port) || port < 0 || port >= 65536) {
    console.error('Invalid port number in configuration file:', portString);
    process.exit(1);
}

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url?.startsWith('/format:')) {
        const format = req.url.substring('/format:'.length);
        const now = new Date();
        const formattedTime = now.toISOString(); // Usa el formato ISO como ejemplo
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(formattedTime);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Maneja errores del servidor
server.on('error', (err) => {
    console.error('Server error:', err.message);
    process.exit(1);
});

// Inicia el servidor en el puerto especificado
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
