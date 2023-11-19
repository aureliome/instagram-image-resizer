import sharp from "sharp";
import { getFileNameFromPath } from "./utils";
import {
  IG_POST_HEIGHT_HOR,
  IG_POST_WIDTH,
  SHARP_JPEG_OPTIONS,
  SHARP_RESIZE_OPTIONS,
} from "./constants";
import { logSuccessfulImageCreation } from "./logger";

export default async (
  sourceFilePath: string,
  width: number,
  height: number,
  destinationPath: string
) => {
  const fileName = getFileNameFromPath(sourceFilePath);

  const fileName1 = `${destinationPath}/${fileName}-1.jpg`;
  await sharp(sourceFilePath)
    .resize(IG_POST_WIDTH, IG_POST_HEIGHT_HOR, SHARP_RESIZE_OPTIONS)
    .jpeg(SHARP_JPEG_OPTIONS)
    .toFile(fileName1);
  logSuccessfulImageCreation(fileName1);

  if (width !== height) {
    const fileName2 = `${destinationPath}/${fileName}-2.jpg`;
    await sharp(sourceFilePath)
      .extract({
        left: 0,
        top: 0,
        width: Math.floor(width / 2),
        height,
      })
      .resize(IG_POST_WIDTH, IG_POST_HEIGHT_HOR, {
        ...SHARP_RESIZE_OPTIONS,
        position: "right",
      })
      .jpeg(SHARP_JPEG_OPTIONS)
      .toFile(fileName2);
    logSuccessfulImageCreation(fileName2);

    const fileName3 = `${destinationPath}/${fileName}-3.jpg`;
    await sharp(sourceFilePath)
      .extract({
        left: Math.floor(width / 2),
        top: 0,
        width: Math.floor(width / 2),
        height,
      })
      .resize(IG_POST_WIDTH, IG_POST_HEIGHT_HOR, {
        ...SHARP_RESIZE_OPTIONS,
        position: "left",
      })
      .jpeg(SHARP_JPEG_OPTIONS)
      .toFile(fileName3);
    logSuccessfulImageCreation(fileName3);
  }
};
