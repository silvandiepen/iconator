import { ISettings, IIcon } from "../types";
export declare const createFolder: (folder: any) => Promise<void>;
export declare const buildIcon: (icon: IIcon, settings: ISettings) => Promise<void>;
export declare const buildIcons: (settings: ISettings) => Promise<ISettings>;
