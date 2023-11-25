import { resizeImage } from "./image";
import { createDirectory } from "./utils";
import resizeHorizontalImage from "./horizontal";
import resizeVerticalImage from "./vertical";

jest.mock("./utils", () => ({
  createDirectory: jest.fn(),
}));

jest.mock("./horizontal", () => jest.fn());
jest.mock("./vertical", () => jest.fn());

jest.mock("sharp", () => {
  return (filePath: string) => {
    return {
      metadata: () => {
        switch (filePath) {
          case "/source/path/no-width.jpg":
            return { height: 500 };
          case "/source/path/no-height.jpg":
            return { width: 500 };
          case "/source/path/square.jpg":
            return { width: 500, height: 500 };
          case "/source/path/landscape.jpg":
            return { width: 500, height: 300 };
          case "/source/path/portrait.jpg":
            return { width: 300, height: 500 };
          default:
            return { width: 500, height: 500 };
        }
      },
    };
  };
});

const removeAllSpaces = (string) => string.replace(/\s/g, "");

const widthOrHeightError = (sourcePath) => `
  Source Image '${sourcePath}' width and height have not been retrieved
  Check that it is a real image file`;

describe("image", () => {
  describe("resizeImage", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("it calls createDirectory with the destination path", async () => {
      const destinationPath = "/destination/path";
      await resizeImage("/source/path/file.jpg", destinationPath);
      expect(createDirectory).toHaveBeenCalledWith(destinationPath);
    });

    it("it throws an error if image width is undefined", async () => {
      const sourcePath = "/source/path/no-width.jpg";
      try {
        await resizeImage(sourcePath, "/destination/path");
      } catch (error) {
        expect(removeAllSpaces(error.message)).toBe(
          removeAllSpaces(widthOrHeightError(sourcePath))
        );
        expect(resizeHorizontalImage).not.toHaveBeenCalled();
        expect(resizeVerticalImage).not.toHaveBeenCalled();
      }
    });

    it("it throws an error if image height is undefined", async () => {
      const sourcePath = "/source/path/no-height.jpg";
      try {
        await resizeImage(sourcePath, "/destination/path");
      } catch (error) {
        expect(removeAllSpaces(error.message)).toBe(
          removeAllSpaces(widthOrHeightError(sourcePath))
        );
        expect(resizeHorizontalImage).not.toHaveBeenCalled();
        expect(resizeVerticalImage).not.toHaveBeenCalled();
      }
    });

    it("it calls resizeVerticalImage if the image is a portrait", async () => {
      const sourcePath = "/source/path/portrait.jpg";
      const destinationPath = "/destination/path";
      await resizeImage(sourcePath, destinationPath);
      expect(resizeVerticalImage).toHaveBeenCalledWith(
        sourcePath,
        destinationPath
      );
    });

    it("it calls resizeHorizontalImage if the image is a landscape", async () => {
      const sourcePath = "/source/path/landscape.jpg";
      const destinationPath = "/destination/path";
      await resizeImage(sourcePath, destinationPath);
      expect(resizeHorizontalImage).toHaveBeenCalledWith(
        sourcePath,
        500,
        300,
        destinationPath
      );
    });

    it("it calls resizeHorizontalImage if the image is a square", async () => {
      const sourcePath = "/source/path/square.jpg";
      const destinationPath = "/destination/path";
      await resizeImage(sourcePath, destinationPath);
      expect(resizeHorizontalImage).toHaveBeenCalledWith(
        sourcePath,
        500,
        500,
        destinationPath
      );
    });
  });
});
