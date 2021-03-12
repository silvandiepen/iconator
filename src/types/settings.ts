import { Icon } from "./config";

interface OutputSettings {
  input: string;
  output: string;
  destination?: string;
  color?: string;
  themeColor?: string;
  appleStatusBarStyle?: string;
  appName?: string;
  appDeveloper?: string;
  appDeveloperUrl?: string;
  appDescription?: string;
  url?: string;
}

export interface Settings extends OutputSettings {
  package?: any;
  debug?: boolean;
  icons?: Icon[];
  html?: string[];
  logging?: string[];
  sets?: string[];
}
export interface Output {
  icons: Icon[];
  html: string[];
  settings: Settings;
}
