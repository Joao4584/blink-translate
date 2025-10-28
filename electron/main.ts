import { app, BrowserWindow, globalShortcut, Tray } from "electron";
import { registerListeners } from "./ipc/listeners";
import { createTray } from "./core/tray";
import { registerShortcuts } from "./core/shortcuts";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let popupWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createPopupWindow() {
  popupWindow = new BrowserWindow({
    width: 450,
    height: 600,
    minWidth: 250,
    minHeight: 100,
    show: false,
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: true,
    webPreferences: {
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  popupWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  popupWindow.on("closed", () => (popupWindow = null));
  popupWindow.on("blur", () => {
    if (popupWindow?.isVisible()) {
        popupWindow.hide()
    }
  });
}

app.whenReady().then(() => {
  createPopupWindow();
  
  if (popupWindow) {
    tray = createTray(popupWindow);
    registerListeners(popupWindow);
    registerShortcuts(popupWindow, tray);
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});