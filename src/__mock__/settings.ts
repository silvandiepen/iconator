import { Payload } from "../types";
import { defaultSettings } from "../settings";
import { join } from "path";
export const settings: Payload = {
  ...defaultSettings,
  input: join(__dirname, "../test/test.png"),
  output: "temp/dist",
  logging: ["silent"],
};
