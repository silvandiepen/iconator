#!/usr/bin/env node
import { Output, InputSettings } from "./types";
declare const buildIconator: (config?: InputSettings) => Promise<Output>;
export default buildIconator;
