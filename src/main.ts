import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as http from 'http';
import * as fs from 'fs';

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

// Crea la ventana principal
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));

    // Opcional: Abre las herramientas de desarrollo
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Manejo de eventos IPC
ipcMain.handle('fetch-time', async () => {
    return new Promise<string>((resolve, reject) => {
        http.get(`http://localhost:${port}/format:yyyy-MM-ddTHH:mm:ssZ`, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve(data));
        }).on('error', err => reject(err));
    });
});

ipcMain.handle('set-time', async (event, time: string) => {
    try {
        // Aquí puedes implementar la lógica para cambiar la hora.
        // Este es un lugar para llamar a un proceso elevado si es necesario.
        console.log(`Setting time to ${time}`);
        // Simula el proceso para fines de demostración
        return `Time set to: ${time}`;
    } catch (error) {
        throw new Error('Failed to set time');
    }
});
