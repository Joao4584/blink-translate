import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('Main', {
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  getVolume: () => ipcRenderer.invoke('get-volume'),
  setVolume: (volume: number) => ipcRenderer.send('set-volume', volume),
  increaseVolume: () => ipcRenderer.send('increase-volume'),
  decreaseVolume: () => ipcRenderer.send('decrease-volume'),
  onVolumeChanged: (callback: (volume: number) => void) => {
    ipcRenderer.on('volume-changed', (_, volume) => callback(volume));
  },
  takeScreenshot: () => ipcRenderer.invoke('take-screenshot'),
  sendMessage: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
  off: (channel: string, callback: Function) => {
    ipcRenderer.removeListener(channel, callback);
  },
});
