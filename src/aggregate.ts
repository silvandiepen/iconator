import { getFileData } from "@sil/tools";
import { join } from "path";
import { Payload } from "./types";

export const getPackage = async (payload: Payload): Promise<Payload> => {
  try {
    let PackageData = await getFileData(join(__dirname, "../package.json"));
    return { ...payload, package: JSON.parse(PackageData) };
  } catch (err) {
    return payload;
  }
};
