#!/usr/bin/env node
import { ISettings } from "./types";
export declare const doIconator: (settings: ISettings) => Promise<ISettings>;
declare const buildTheIcons: (config?: ISettings) => Promise<void>;
export default buildTheIcons;
