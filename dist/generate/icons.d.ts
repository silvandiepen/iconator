import { Settings, Icon } from "../types";
export declare const createFolder: (folder: string) => Promise<void>;
export declare const buildIcon: (icon: Icon, settings: Settings) => Promise<void>;
export declare const buildIcons: (settings: Settings) => Promise<Settings>;
