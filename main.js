const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec, spawn } = require('child_process');
const http = require('http');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // URL del frontend

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function waitForServer(url, callback) {
  const interval = setInterval(() => {
    http.get(url, (res) => {
      if (res.statusCode === 200) {
        clearInterval(interval);
        callback();
      }
    }).on('error', () => {
      console.log('Waiting for the frontend server to be ready...');
    });
  }, 1000);
}

function installDependencies(callback) {
  const installBackend = spawn('npm', ['install'], { cwd: path.join(__dirname, 'dateAppBackend') });
  const installFrontend = spawn('npm', ['install'], { cwd: path.join(__dirname, 'dateAppFront') });

  installBackend.stdout.on('data', (data) => console.log(`Backend install: ${data}`));
  installBackend.stderr.on('data', (data) => console.error(`Backend install error: ${data}`));

  installFrontend.stdout.on('data', (data) => console.log(`Frontend install: ${data}`));
  installFrontend.stderr.on('data', (data) => console.error(`Frontend install error: ${data}`));

  let backendDone = false;
  let frontendDone = false;

  installBackend.on('close', (code) => {
    console.log(`Backend install process exited with code ${code}`);
    backendDone = true;
    if (backendDone && frontendDone) callback();
  });

  installFrontend.on('close', (code) => {
    console.log(`Frontend install process exited with code ${code}`);
    frontendDone = true;
    if (backendDone && frontendDone) callback();
  });
}

app.on('ready', () => {
  installDependencies(() => {
    // Inicia el backend
    const backend = exec('npm run dev', { cwd: path.join(__dirname, 'dateAppBackend') });
    backend.stdout.on('data', (data) => {
      console.log(`Backend: ${data}`);
    });
    backend.stderr.on('data', (data) => {
      console.error(`Backend error: ${data}`);
    });

    // Inicia el frontend
    const frontend = exec('npm start', { cwd: path.join(__dirname, 'dateAppFront') });
    frontend.stdout.on('data', (data) => {
      console.log(`Frontend: ${data}`);
    });
    frontend.stderr.on('data', (data) => {
      console.error(`Frontend error: ${data}`);
    });

    // Espera hasta que el frontend esté listo antes de crear la ventana de Electron
    waitForServer('http://localhost:3000', createWindow);
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
