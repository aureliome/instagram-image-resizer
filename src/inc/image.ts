import sharp from "sharp";
import { createDirectory } from "./utils";
import resizeHorizontalImage from "./horizontal";
import resizeVerticalImage from "./vertical";

export const resizeImage = async (
  sourceFilePath: string,
  destinationPath: string
): Promise<string[]> => {
  await createDirectory(destinationPath);

  const { width: sourceWidth, height: sourceHeight } =
    await sharp(sourceFilePath).metadata();

  if (!sourceWidth || !sourceHeight) {
    throw new Error(`
    Source Image '${sourceFilePath}' width and height have not been retrieved
    Check that it is a real image file`);
  }

  if (sourceWidth < sourceHeight) {
    return await resizeVerticalImage({ sourceFilePath, destinationPath });
  } else {
    return await resizeHorizontalImage({
      sourceFilePath,
      destinationPath,
      sourceWidth,
      sourceHeight,
    });
  }
};
