import sharp from "sharp";
import resizeVerticalImage from "./vertical";
import { getFileNameFromPath } from "./utils";
import { logSuccessfulImageCreation } from "./logger";
import {
  IG_POST_WIDTH,
  IG_POST_HEIGHT_VER,
  SHARP_RESIZE_OPTIONS,
  SHARP_JPEG_OPTIONS,
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
jest.mock("sharp", () =>
  jest.fn(() => {
    return {
      resize: resizeMock,
    };
  })
);

describe("vertical", () => {
  describe("default", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("it calls getFileNameFromPath", async () => {
      const sourceFilePath = "/source/path/file.jpg";
      const destinationPath = "/destination/path";
      await resizeVerticalImage({ sourceFilePath, destinationPath });
      expect(getFileNameFromPath).toHaveBeenCalledWith(sourceFilePath);
    });

    it("it calls sharp methods", async () => {
      const sourceFilePath = "/source/path/file.jpg";
      const destinationPath = "/destination/path";
      await resizeVerticalImage({ sourceFilePath, destinationPath });
      expect(sharp).toHaveBeenCalledWith(sourceFilePath);
      expect(resizeMock).toHaveBeenCalledWith(
        IG_POST_WIDTH,
        IG_POST_HEIGHT_VER,
        SHARP_RESIZE_OPTIONS
      );
      expect(jpegMock).toHaveBeenCalledWith(SHARP_JPEG_OPTIONS);
      expect(toFileMock).toHaveBeenCalledWith(`${destinationPath}/file-1.jpg`);
    });

    it("it calls logSuccessfulImageCreation", async () => {
      const sourceFilePath = "/source/path/file.jpg";
      const destinationPath = "/destination/path";
      await resizeVerticalImage({ sourceFilePath, destinationPath });
      expect(logSuccessfulImageCreation).toHaveBeenCalledWith(
        `${destinationPath}/file-1.jpg`
      );
    });
  });
});
