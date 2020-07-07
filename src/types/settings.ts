import { IIcon } from "./config";
export interface ISettings {
	input?: string;
	output?: string;
	color?: string;
	themeColor?: string;
	appleStatusBarStyle?: string;
	appName?: string;
	appDeveloper?: string;
	appDeveloperUrl?: string;
	appDescription?: string;
	package?: any;
	debug?: boolean;
	icons?: IIcon[];
	html?: string[];
	silent?: boolean;
}
export interface IOutput {
	icons: IIcon[];
	html: string[];
	settings: ISettings;
}
