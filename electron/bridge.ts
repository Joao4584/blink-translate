import { contextBridge, ipcRenderer, desktopCapturer } from 'electron'

export const api = {
  getVolume: () => ipcRenderer.invoke('get-volume'),
  setVolume: (volume: number) => ipcRenderer.send('set-volume', volume),
  increaseVolume: () => ipcRenderer.send('increase-volume'),
  decreaseVolume: () => ipcRenderer.send('decrease-volume'),
  onVolumeChanged: (callback: (volume: number) => void) => {
    ipcRenderer.on('volume-changed', (_, volume) => callback(volume))
  },
  takeScreenshot: async (): Promise<string> => {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1920, height: 1080 }
    })
    if (sources && sources.length > 0) {
      return sources[0].thumbnail.toDataURL()
    } else {
      throw new Error("Nenhuma fonte de tela encontrada (No screen sources found).")
    }
  },


  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
