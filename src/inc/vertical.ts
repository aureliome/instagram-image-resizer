import sharp from "sharp";
import { getFileNameFromPath } from "./utils";
import { logSuccessfulImageCreation } from "./logger";
import {
  IG_POST_WIDTH,
  IG_POST_HEIGHT_VER,
  SHARP_RESIZE_OPTIONS,
  SHARP_JPEG_OPTIONS,
} from "./constants";

export default async (sourceFilePath: string, destinationPath: string) => {
  const fileName = getFileNameFromPath(sourceFilePath);

  const fileName1 = `${destinationPath}/${fileName}-1.jpg`;
  await sharp(sourceFilePath)
    .resize(IG_POST_WIDTH, IG_POST_HEIGHT_VER, SHARP_RESIZE_OPTIONS)
    .jpeg(SHARP_JPEG_OPTIONS)
    .toFile(fileName1);
  logSuccessfulImageCreation(fileName1);
};
