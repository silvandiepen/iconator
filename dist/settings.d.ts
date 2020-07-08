import { ISettings } from "./types";
export declare const defaultSettings: {
    input: string;
    output: string;
    destination: string;
    debug: boolean;
    logging: any[];
    color: string;
    themeColor: string;
    appleStatusBarStyle: string;
    appName: string;
    appDeveloper: string;
    appDeveloperUrl: string;
    appDescription: string;
};
export declare const settings: () => ISettings;
