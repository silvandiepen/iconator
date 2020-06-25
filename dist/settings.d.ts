import { ISettings } from "./types";
export declare const defaultSettings: {
    input: string;
    output: string;
    debug: boolean;
    color: string;
    themeColor: string;
    appleStatusBarStyle: string;
    appName: string;
    appDeveloper: string;
    appDeveloperUrl: string;
    appDescription: string;
};
export declare const settings: () => ISettings;
