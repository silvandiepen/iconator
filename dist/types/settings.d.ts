import { IIcon } from "./config";
export interface ISettings {
    input: string;
    output: string;
    package?: any;
    debug: boolean;
    icons?: IIcon[];
    html?: string[];
    color: string;
    themeColor: string;
    appleStatusBarStyle: string;
    appName: string;
    appDeveloper: string;
    appDeveloperUrl: string;
    appDescription: string;
    silent?: boolean;
}
