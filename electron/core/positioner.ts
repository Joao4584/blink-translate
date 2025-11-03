import { BrowserWindow, Tray, screen } from 'electron';

export function positionPopup(popupWindow: BrowserWindow, tray: Tray) {
  if (!popupWindow || !tray) return;

  if (process.platform === 'linux') {
    const cursorPos = screen.getCursorScreenPoint();
    const windowBounds = popupWindow.getBounds();
    const display = screen.getDisplayNearestPoint(cursorPos);
    const { width: screenWidth, height: screenHeight } = display.workAreaSize;

    let x = Math.round(cursorPos.x - windowBounds.width / 2);
    let y = Math.round(cursorPos.y + 10);

    if (x < display.workArea.x) {
      x = display.workArea.x;
    }
    if (x + windowBounds.width > display.workArea.x + screenWidth) {
      x = display.workArea.x + screenWidth - windowBounds.width;
    }
    if (y + windowBounds.height > display.workArea.y + screenHeight) {
      y = cursorPos.y - windowBounds.height - 10;
    }

    popupWindow.setPosition(x, y, false);
  } else {
    const trayBounds = tray.getBounds();
    const windowBounds = popupWindow.getBounds();
    const display = screen.getDisplayNearestPoint({ x: trayBounds.x, y: trayBounds.y });
    const { width: screenWidth, height: screenHeight } = display.workAreaSize;

    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );

    let y = Math.round(trayBounds.y + trayBounds.height);
    if (y + windowBounds.height > screenHeight) {
      y = Math.round(trayBounds.y - windowBounds.height);
    }

    popupWindow.setPosition(x, y, false);
  }
}
