const { readFile } = require("fs").promises;
import { join } from "path";
import { Payload } from "./types";

export const getPackage = async (payload: Payload): Promise<Payload> => {
  try {
    let PackageData = await readFile(
      join(__dirname, "../package.json")
    ).then((res) => res.toString());
    return { ...payload, package: JSON.parse(PackageData) };
  } catch (err) {
    return payload;
  }
};
