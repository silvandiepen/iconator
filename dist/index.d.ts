#!/usr/bin/env node
import { ISettings } from "./types";
declare const buildIconator: (config?: ISettings) => Promise<ISettings>;
export default buildIconator;
