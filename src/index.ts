import { promises as fs } from "fs";
import { resizeImage } from "./inc/image";

export default async (sourcePath: string, destPath: string) => {
  const stat = await fs.lstat(sourcePath);

  if (stat.isDirectory()) {
    const files = await fs.readdir(sourcePath);
    for (const fileName of files) {
      await resizeImage(`${sourcePath}/${fileName}`, destPath);
    }
  } else if (stat.isFile()) {
    await resizeImage(sourcePath, destPath);
  } else {
    throw new Error(`Error while processing the path '${sourcePath}'`);
  }
};
