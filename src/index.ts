import { promises as fs } from "fs";
import { resizeImage } from "./inc/image";
import { isImageFile } from "./inc/utils";

export default async (
  sourcePath: string,
  destPath: string
): Promise<string[]> => {
  const stat = await fs.lstat(sourcePath);

  if (stat.isDirectory()) {
    let files = await fs.readdir(sourcePath);
    files = files.filter((filename) => isImageFile(filename));
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
