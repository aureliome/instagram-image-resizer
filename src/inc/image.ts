import sharp from "sharp";
import { createDirectory } from "./utils.js";
import resizeHorizontalImage from "./horizontal.js";
import resizeVerticalImage from "./vertical.js";

export const resizeImage = async (sourceFilePath: string, destinationPath: string) => {
  await createDirectory(destinationPath);

  const { width, height } = await sharp(sourceFilePath).metadata();

  if (!width || !height) {
    throw new Error(`
    Source Image '${sourceFilePath}' width and height have not been retrieved
    Check that it is a real image file`);
  }

  if (width < height) {
    await resizeVerticalImage(sourceFilePath, destinationPath);
  } else {
    await resizeHorizontalImage(sourceFilePath, width, height, destinationPath);
  }
};
