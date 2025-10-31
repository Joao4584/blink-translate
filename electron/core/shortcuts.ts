import { globalShortcut, BrowserWindow, Tray, screen } from 'electron';
import { positionPopup } from './positioner';

declare const SELECTION_WINDOW_WEBPACK_ENTRY: string;
declare const SELECTION_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let selectionWindow: BrowserWindow | null = null;

function createSelectionWindow() {
  const { width, height } = screen.getPrimaryDisplay().bounds;

  selectionWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    frame: false,
    transparent: false, // Set to false, as we're using a semi-transparent background color
    backgroundColor: '#D3D3D3', // Solid light gray
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: true,
    webPreferences: {
      contextIsolation: true,
      preload: SELECTION_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  selectionWindow.loadURL(SELECTION_WINDOW_WEBPACK_ENTRY);
  selectionWindow.on("closed", () => (selectionWindow = null));
  selectionWindow.on("blur", () => {
    if (selectionWindow?.isVisible()) {
      selectionWindow.close();
    }
  });
}

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
    // Bypassing IPC, direct call for debugging
    if (!selectionWindow) {
      createSelectionWindow();
    }
  });

  if (!retScreenshot) {
    console.log('Shortcut registration for Alt+Shift+S failed');
  } else {
    console.log('Shortcut Alt+Shift+S registered successfully');
  }
}