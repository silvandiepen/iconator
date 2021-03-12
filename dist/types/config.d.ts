export interface Icon {
    name: string;
    width?: number;
    height?: number;
    sizes?: IconSizes;
    transparent: boolean;
    rotate: false | number;
    mask: boolean;
    orientation?: "landscape" | "portrait";
    devicePxRatio?: number;
}
interface IconSizes {
    width: number;
    height: number;
}
export interface Icons {
    [key: string]: Icon[];
}
export {};
