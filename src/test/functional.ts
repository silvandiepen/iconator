#!/usr/bin/env node
const Iconator = require("../").default;
import { join } from "path";
Iconator({
	input: join(__dirname, "../../src/test/test.png"),
});
