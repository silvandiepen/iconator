import { Payload } from "../types";
import Jimp from "jimp";
export declare const createFolder: (folder: string) => Promise<void>;
export declare const processIcon: (image: any, icon: any, payload: any) => Promise<void>;
export declare const loadSourceImage: (payload: Payload) => Promise<Jimp>;
export declare const buildIcons: (payload: Payload) => Promise<Payload>;
