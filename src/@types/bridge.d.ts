import { api } from '../../electron/bridge'

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: {
      getVolume: () => Promise<number>;
      setVolume: (volume: number) => void;
      increaseVolume: () => void;
      decreaseVolume: () => void;
      onVolumeChanged: (callback: (volume: number) => void) => void;
      takeScreenshot: () => Promise<string>;
      sendMessage: (message: string) => void;
      on: (channel: string, callback: Function) => void;
    }
  }
}
