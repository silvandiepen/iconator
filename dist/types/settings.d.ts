import { IIcon } from "./config";
interface IOutputSettings {
    input?: string;
    output?: string;
    destination?: string;
    color?: string;
    themeColor?: string;
    appleStatusBarStyle?: string;
    appName?: string;
    appDeveloper?: string;
    appDeveloperUrl?: string;
    appDescription?: string;
}
export interface ISettings extends IOutputSettings {
    package?: any;
    debug?: boolean;
    icons?: IIcon[];
    html?: string[];
    logging?: string[];
}
export interface IOutput {
    icons: IIcon[];
    html: string[];
    settings: ISettings;
}
export {};
