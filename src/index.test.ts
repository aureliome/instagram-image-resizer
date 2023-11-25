import { promises as fs } from "fs";
import { resizeImage } from "./inc/image";
import main from "./index";

jest.mock("fs");

jest.mock("./inc/image", () => ({
  resizeImage: jest.fn(),
}));

describe("main", () => {
  const destinationPath = "/destination/path";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it resizes children images if the input is a directory", async () => {
    const sourcePath = "path/to/existing/directory";
    await main(sourcePath, destinationPath);
    expect(fs.lstat).toHaveBeenCalledWith(sourcePath);
    expect(resizeImage).toHaveBeenCalledWith(
      `${sourcePath}/file-1.jpg`,
      destinationPath
    );
    expect(resizeImage).toHaveBeenCalledWith(
      `${sourcePath}/file-2.jpg`,
      destinationPath
    );
  });

  it("it resizes single image if the input is a file", async () => {
    const sourcePath = "path/to/file";
    await main(sourcePath, destinationPath);
    expect(resizeImage).toHaveBeenCalledWith(sourcePath, destinationPath);
  });

  it("it throws an error if the input is unknown", async () => {
    const sourcePath = "path/to/unknown";
    try {
      await main(sourcePath, destinationPath);
    } catch (error) {
      expect(error.message).toBe(
        `Error while processing the path '${sourcePath}'`
      );
    }
  });
});
