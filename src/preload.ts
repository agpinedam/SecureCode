import { contextBridge, ipcRenderer } from 'electron';

// Definición de la API que se expone a la ventana renderizada
contextBridge.exposeInMainWorld('api', {
    fetchTime: () => ipcRenderer.invoke('fetch-time'),
    setTime: (time: string) => ipcRenderer.invoke('set-time', time)
});
