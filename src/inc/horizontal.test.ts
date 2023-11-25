import sharp from "sharp";
import resizeHorizontalImage from "./horizontal";
import { getFileNameFromPath } from "./utils";
import { logSuccessfulImageCreation } from "./logger";
import {
  IG_POST_HEIGHT_HOR,
  IG_POST_WIDTH,
  SHARP_JPEG_OPTIONS,
  SHARP_RESIZE_OPTIONS,
} from "./constants";

jest.mock("./utils", () => ({
  getFileNameFromPath: jest.fn(() => "file"),
}));

jest.mock("./logger", () => ({
  logSuccessfulImageCreation: jest.fn(),
}));

const toFileMock = jest.fn();
const jpegMock = jest.fn(() => ({
  toFile: toFileMock,
}));
const resizeMock = jest.fn(() => ({
  jpeg: jpegMock,
}));
const extractMock = jest.fn(() => ({
  resize: resizeMock,
}));
jest.mock("sharp", () =>
  jest.fn(() => {
    return {
      resize: resizeMock,
      extract: extractMock,
    };
  })
);

describe("horizontal", () => {
  describe("default", () => {
    const sourceFilePath = "/source/path/file.jpg";
    const destinationPath = "/destination/path";

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("it calls getFileNameFromPath", () => {
      const sourceWidth = 500;
      const sourceHeight = 500;
      resizeHorizontalImage({
        sourceFilePath,
        destinationPath,
        sourceWidth,
        sourceHeight,
      });
      expect(getFileNameFromPath).toHaveBeenCalledWith(sourceFilePath);
    });

    describe("square images", () => {
      it("it generates file-1.jpg", async () => {
        const sourceWidth = 500;
        const sourceHeight = 500;
        await resizeHorizontalImage({
          sourceFilePath,
          destinationPath,
          sourceWidth,
          sourceHeight,
        });

        expect(sharp).toHaveBeenCalledWith(sourceFilePath);
        expect(resizeMock).toHaveBeenCalledWith(
          IG_POST_WIDTH,
          IG_POST_HEIGHT_HOR,
          SHARP_RESIZE_OPTIONS
        );
        expect(jpegMock).toHaveBeenCalledWith(SHARP_JPEG_OPTIONS);
        expect(toFileMock).toHaveBeenCalledWith(
          `${destinationPath}/file-1.jpg`
        );
        expect(logSuccessfulImageCreation).toHaveBeenCalledWith(
          `${destinationPath}/file-1.jpg`
        );
        expect(extractMock).not.toHaveBeenCalled();
        expect(logSuccessfulImageCreation).not.toHaveBeenCalledWith(
          `${destinationPath}/file-2.jpg`
        );
        expect(logSuccessfulImageCreation).not.toHaveBeenCalledWith(
          `${destinationPath}/file-2.jpg`
        );
      });
    });

    describe("landscape images", () => {
      const sourceWidth = 500;
      const sourceHeight = 300;

      it("it generates file-1.jpg", async () => {
        await resizeHorizontalImage({
          sourceFilePath,
          destinationPath,
          sourceWidth,
          sourceHeight,
        });

        expect(sharp).toHaveBeenCalledWith(sourceFilePath);
        expect(resizeMock).toHaveBeenCalledWith(
          IG_POST_WIDTH,
          IG_POST_HEIGHT_HOR,
          SHARP_RESIZE_OPTIONS
        );
        expect(jpegMock).toHaveBeenCalledWith(SHARP_JPEG_OPTIONS);
        expect(toFileMock).toHaveBeenCalledWith(
          `${destinationPath}/file-1.jpg`
        );
        expect(logSuccessfulImageCreation).toHaveBeenCalledWith(
          `${destinationPath}/file-1.jpg`
        );
      });

      it("it generates file-2.jpg", async () => {
        await resizeHorizontalImage({
          sourceFilePath,
          destinationPath,
          sourceWidth,
          sourceHeight,
        });

        expect(sharp).toHaveBeenCalledWith(sourceFilePath);
        expect(extractMock).toHaveBeenCalledWith({
          left: 0,
          top: 0,
          width: Math.floor(sourceWidth / 2),
          height: sourceHeight,
        });
        expect(resizeMock).toHaveBeenCalledWith(
          IG_POST_WIDTH,
          IG_POST_HEIGHT_HOR,
          {
            ...SHARP_RESIZE_OPTIONS,
            position: "right",
          }
        );
        expect(jpegMock).toHaveBeenCalledWith(SHARP_JPEG_OPTIONS);
        expect(toFileMock).toHaveBeenCalledWith(
          `${destinationPath}/file-2.jpg`
        );
        expect(logSuccessfulImageCreation).toHaveBeenCalledWith(
          `${destinationPath}/file-2.jpg`
        );
      });

      it("it generates file-3.jpg", async () => {
        await resizeHorizontalImage({
          sourceFilePath,
          destinationPath,
          sourceWidth,
          sourceHeight,
        });

        expect(sharp).toHaveBeenCalledWith(sourceFilePath);
        expect(extractMock).toHaveBeenCalledWith({
          left: Math.floor(sourceWidth / 2),
          top: 0,
          width: Math.floor(sourceWidth / 2),
          height: sourceHeight,
        });
        expect(resizeMock).toHaveBeenCalledWith(
          IG_POST_WIDTH,
          IG_POST_HEIGHT_HOR,
          {
            ...SHARP_RESIZE_OPTIONS,
            position: "left",
          }
        );
        expect(jpegMock).toHaveBeenCalledWith(SHARP_JPEG_OPTIONS);
        expect(toFileMock).toHaveBeenCalledWith(
          `${destinationPath}/file-3.jpg`
        );
        expect(logSuccessfulImageCreation).toHaveBeenCalledWith(
          `${destinationPath}/file-3.jpg`
        );
      });
    });
  });
});
