const { readFile } = require("fs").promises;
import { join } from "path";
import { Settings } from "./types";

export const getPackage = async (settings: Settings): Promise<Settings> => {
  try {
    let PackageData = await readFile(
      join(__dirname, "../package.json")
    ).then((res) => res.toString());
    return { ...settings, package: JSON.parse(PackageData) };
  } catch (err) {
    return settings;
  }
};
