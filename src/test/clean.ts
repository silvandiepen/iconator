import rimraf from "rimraf";
const { sync } = rimraf;

export const cleanup = (folder: string) => sync(folder);

cleanup("../../temp");
