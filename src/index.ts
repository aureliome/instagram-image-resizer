import { promises as fs } from "fs";
import { resizeImage } from "./inc/image";

export default async (
  sourcePath: string,
  destPath: string
): Promise<string[]> => {
  const stat = await fs.lstat(sourcePath);

  if (stat.isDirectory()) {
    const files = await fs.readdir(sourcePath);
    const destinationFiles: string[] = [];
    for (const fileName of files) {
      destinationFiles.push(
        ...(await resizeImage(`${sourcePath}/${fileName}`, destPath))
      );
    }
    return destinationFiles;
  } else if (stat.isFile()) {
    return await resizeImage(sourcePath, destPath);
  } else {
    throw new Error(`Error while processing the path '${sourcePath}'`);
  }
};
