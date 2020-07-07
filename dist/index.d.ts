#!/usr/bin/env node
import { ISettings, IOutput } from "./types";
declare const buildIconator: (config?: ISettings) => Promise<IOutput>;
export default buildIconator;
