import { globalShortcut, BrowserWindow, Tray } from 'electron';
import { positionPopup } from './positioner';

export function registerShortcuts(popupWindow: BrowserWindow, tray: Tray) {
  const ret = globalShortcut.register('Alt+S', () => {
    if (!popupWindow) return;

    if (popupWindow.isVisible()) {
      popupWindow.hide();
    } else {
      positionPopup(popupWindow, tray);
      popupWindow.show();
    }
  });

  if (!ret) {
    console.log('Shortcut registration for Alt+S failed');
  } else {
    console.log('Shortcut Alt+S registered successfully');
  }

  const retScreenshot = globalShortcut.register('Alt+Shift+S', () => {
    if (!popupWindow) return;

    if (!popupWindow.isVisible()) {
      positionPopup(popupWindow, tray);
      popupWindow.show();
    }

    // Add a small delay to ensure the renderer is ready
    setTimeout(() => {
      if (popupWindow && !popupWindow.isDestroyed()) {
        popupWindow.webContents.send('start-screenshot');
      }
    }, 150);
  });

  if (!retScreenshot) {
    console.log('Shortcut registration for Alt+Shift+S failed');
  } else {
    console.log('Shortcut Alt+Shift+S registered successfully');
  }
}
