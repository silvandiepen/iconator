#!/usr/bin/env node
import { ISettings } from "./types";
declare const buildIconator: (config?: ISettings) => Promise<void>;
export default buildIconator;
