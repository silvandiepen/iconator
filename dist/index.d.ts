#!/usr/bin/env node
import { Settings, Output } from "./types";
declare const buildIconator: (config?: Settings) => Promise<Output>;
export default buildIconator;
