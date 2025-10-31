import { ipcMain, BrowserWindow, screen, desktopCapturer } from 'electron';
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

  ipcMain.on('region-selected', async (event, rect) => {
    const selectionWin = BrowserWindow.fromWebContents(event.sender);
    selectionWin?.close();

    try {
      const primaryDisplay = screen.getPrimaryDisplay();
      const { scaleFactor } = primaryDisplay;

      const scaledRect = {
        x: rect.x * scaleFactor,
        y: rect.y * scaleFactor,
        width: rect.width * scaleFactor,
        height: rect.height * scaleFactor,
      };

      const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
          width: primaryDisplay.bounds.width * scaleFactor,
          height: primaryDisplay.bounds.height * scaleFactor,
        },
      });

      const screenSource = sources.find(s => s.display_id === String(primaryDisplay.id)) || sources[0];
      const screenshot = screenSource.thumbnail;
      const croppedImage = screenshot.crop(scaledRect);
      const dataUrl = croppedImage.toDataURL();

      popupWindow?.webContents.send('screenshot-taken', dataUrl);

    } catch (e) {
      console.error('Failed to capture screen:', e);
    }
  });
}
