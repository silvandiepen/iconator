import { Payload } from "../types";
export declare const createFolder: (folder: string) => Promise<void>;
export declare const processIcon: (image: any, icon: any, payload: any) => Promise<void>;
declare type Image = any;
export declare const loadSourceImage: (input: string) => Promise<Image>;
export declare const buildIcons: (payload: Payload) => Promise<Payload>;
export {};
