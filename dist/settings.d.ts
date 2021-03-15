import { Payload } from "./types";
export declare const defaultSettings: {
    input: string;
    output: string;
    destination: string;
    debug: boolean;
    logging: any[];
    sets: any[];
    meta: any[];
    color: string;
    themeColor: string;
    appleStatusBarStyle: string;
    appName: string;
    appDeveloper: string;
    appDeveloperUrl: string;
    appDescription: string;
    url: string;
};
export declare const settings: () => Payload;
