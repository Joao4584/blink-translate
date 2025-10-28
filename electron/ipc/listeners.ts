import { ipcMain, BrowserWindow } from 'electron';
import * as loudness from 'loudness';

export function registerListeners(popupWindow: BrowserWindow) {
  ipcMain.handle("get-volume", async () => loudness.getVolume());

  ipcMain.on("set-volume", async (_, volume) => loudness.setVolume(volume));

  ipcMain.on("increase-volume", async () => {
    const currentVolume = await loudness.getVolume();
    const newVolume = Math.min(currentVolume + 10, 100);
    await loudness.setVolume(newVolume);
    popupWindow?.webContents.send("volume-changed", newVolume);
  });

  ipcMain.on("decrease-volume", async () => {
    const currentVolume = await loudness.getVolume();
    const newVolume = Math.max(currentVolume - 10, 0);
    await loudness.setVolume(newVolume);
    popupWindow?.webContents.send("volume-changed", newVolume);
  });
}
