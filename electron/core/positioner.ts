import { BrowserWindow, Tray, screen } from 'electron';

export function positionPopup(popupWindow: BrowserWindow, tray: Tray) {
  if (!popupWindow || !tray) return;

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
