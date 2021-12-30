export interface iconGroup {
  name: string;
  width: number;
  height: number;
  transparent: boolean;
  rotate: boolean;
  mask: boolean;
  overlayGlow?: boolean;
}

export interface IconData {
  android: iconGroup[];
  appleIcon: iconGroup[];
  appleStartup: iconGroup[];
  coast: iconGroup[];
  favicons: iconGroup[];
  firefore: iconGroup[];
  windows: iconGroup[];
  yandex: iconGroup[];
}
