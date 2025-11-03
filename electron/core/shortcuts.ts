import { globalShortcut, BrowserWindow, Tray, screen, clipboard } from "electron";
import { exec } from "child_process";
import { positionPopup } from "./positioner";

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
    transparent: false,
    backgroundColor: "#D3D3D3",
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
    if (selectionWindow?.isVisible()) selectionWindow.close();
  });
}

export function registerShortcuts(popupWindow: BrowserWindow, tray: Tray) {
  const ret = globalShortcut.register("Alt+S", () => {
    if (!popupWindow) return;

    if (popupWindow.isVisible()) {
      popupWindow.hide();
      return;
    }

    const oldClipboard = clipboard.readText().trim();
    simulateCopy(() => {
      setTimeout(() => {
        const selectedText = clipboard.readText().trim();
        positionPopup(popupWindow, tray);
        popupWindow.show();
        
        if(oldClipboard != selectedText) {
          console.log("Texto copiado:", selectedText || "(vazio)");
          popupWindow.webContents.send("paste-text", selectedText);
        };
      }, 200);
    });
  });

  if (!ret) console.log("Shortcut registration for Alt+S failed");
  else console.log("Shortcut Alt+S registered successfully");

  const retScreenshot = globalShortcut.register("Alt+Shift+S", () => {
    if (!selectionWindow) createSelectionWindow();
  });

  if (!retScreenshot)
    console.log("Shortcut registration for Alt+Shift+S failed");
  else console.log("Shortcut Alt+Shift+S registered successfully");
}

function simulateCopy(callback: () => void) {
  const platform = process.platform;

  if (platform === "win32") {
    exec(
      `powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('^c')"`,
      callback
    );
  } else if (platform === "darwin") {
    exec(
      `osascript -e 'tell application "System Events" to keystroke "c" using command down'`,
      callback
    );
  } else {
    exec(`xdotool key ctrl+c`, callback); // requer xdotool no Linux
  }
}
