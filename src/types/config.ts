export interface IIcon {
	name: string;
	width?: number;
	height?: number;
	sizes?: IIconSizes;
	transparent: boolean;
	rotate: false | number;
	mask: boolean;
	orientation?: "landscape" | "portrait";
	devicePxRatio?: number;
}
interface IIconSizes {
	width: number;
	height: number;
}

export interface IIcons {
	[key: string]: IIcon[];
}
