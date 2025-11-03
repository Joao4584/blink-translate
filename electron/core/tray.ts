import { Tray, nativeImage, BrowserWindow } from 'electron';
import { positionPopup } from './positioner';
import Icon from '../../public/assets/icon.png';

let lastClickTime = 0;

export function createTray(popupWindow: BrowserWindow): Tray {
  const tray = new Tray(nativeImage.createFromPath(Icon));
  tray.setToolTip("Blink Translate");

  tray.on("click", () => {
    const now = Date.now();
    if (now - lastClickTime < 200) {
      return;
    }
    lastClickTime = now;

    if (!popupWindow) return;

    if (popupWindow.isVisible()) {
      popupWindow.hide();
    } else {
      positionPopup(popupWindow, tray);
      popupWindow.show();
      popupWindow.focus();
    }
  });

  return tray;
}
