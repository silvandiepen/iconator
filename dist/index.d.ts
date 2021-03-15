#!/usr/bin/env node
import { Payload, Output } from "./types";
declare const buildIconator: (config?: Payload) => Promise<Output>;
export default buildIconator;
