declare global {
  declare const APP1_APP_CDN: string;
  interface Window {
    [key: string]: any
  }
}

export {}