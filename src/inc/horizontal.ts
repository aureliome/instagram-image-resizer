import sharp from "sharp";
import { getFileNameFromPath } from "./utils";
import {
  IG_POST_HEIGHT_HOR,
  IG_POST_WIDTH,
  SHARP_JPEG_OPTIONS,
  SHARP_RESIZE_OPTIONS,
} from "./constants";

interface ResizeHorizontalImageParameters {
  sourceFilePath: string;
  destinationPath: string;
  sourceWidth: number;
  sourceHeight: number;
}

export default async ({
  sourceFilePath,
  destinationPath,
  sourceWidth,
  sourceHeight,
}: ResizeHorizontalImageParameters): Promise<string[]> => {
  const destinationFiles: string[] = [];
  const fileName = getFileNameFromPath(sourceFilePath);

  const fileName1 = `${destinationPath}/${fileName}-1.jpg`;
  await sharp(sourceFilePath)
    .resize(IG_POST_WIDTH, IG_POST_HEIGHT_HOR, SHARP_RESIZE_OPTIONS)
    .jpeg(SHARP_JPEG_OPTIONS)
    .toFile(fileName1);
  destinationFiles.push(fileName1);

  if (sourceWidth !== sourceHeight) {
    const fileName2 = `${destinationPath}/${fileName}-2.jpg`;
    await sharp(sourceFilePath)
      .extract({
        left: 0,
        top: 0,
        width: Math.floor(sourceWidth / 2),
        height: sourceHeight,
      })
      .resize(IG_POST_WIDTH, IG_POST_HEIGHT_HOR, {
        ...SHARP_RESIZE_OPTIONS,
        position: "right",
      })
      .jpeg(SHARP_JPEG_OPTIONS)
      .toFile(fileName2);
    destinationFiles.push(fileName2);

    const fileName3 = `${destinationPath}/${fileName}-3.jpg`;
    await sharp(sourceFilePath)
      .extract({
        left: Math.floor(sourceWidth / 2),
        top: 0,
        width: Math.floor(sourceWidth / 2),
        height: sourceHeight,
      })
      .resize(IG_POST_WIDTH, IG_POST_HEIGHT_HOR, {
        ...SHARP_RESIZE_OPTIONS,
        position: "left",
      })
      .jpeg(SHARP_JPEG_OPTIONS)
      .toFile(fileName3);
    destinationFiles.push(fileName3);
  }

  return destinationFiles;
};
