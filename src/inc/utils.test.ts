import { ErrnoException } from "../../types/errno-expection";
import { createDirectory, getFileNameFromPath, isImageFile } from "./utils";
import { promises as fs } from "fs";

jest.mock("fs");

describe("utils", () => {
  describe("createDirectory", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("it creates a directory if it does not exist", async () => {
      const directoryPath = "path/to/new/directory";
      await createDirectory(directoryPath);
      expect(fs.mkdir).toHaveBeenCalledWith(directoryPath, {
        recursive: true,
      });
    });

    test("it does nothing if the directory already exists", async () => {
      const directoryPath = "path/to/existing/directory";
      await createDirectory(directoryPath);
      expect(fs.mkdir).not.toHaveBeenCalled();
    });

    test("it creates a directory if fs.stat throws a ENOENT error", async () => {
      const directoryPath = "path/to/enoent/error";
      await createDirectory(directoryPath);
      expect(fs.mkdir).toHaveBeenCalledWith(directoryPath, {
        recursive: true,
      });
    });

    test("it throws an error if fs.stat throws an error different than ENOENT", async () => {
      const directoryPath = "path/to/any/error";
      try {
        await createDirectory(directoryPath);
      } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error) {
          const errnoError = error as ErrnoException;
          expect(errnoError.code).not.toBe("ENOENT");
          expect(fs.mkdir).not.toHaveBeenCalled();
        } else {
          throw new Error("unknown error");
        }
      }
    });
  });

  describe("getFileNameFromPath", () => {
    it("it returns the filename without extension", () => {
      expect(getFileNameFromPath("/path/to/file.jpg")).toBe("file");
      expect(getFileNameFromPath("/path/to/file.foo.jpg")).toBe("file.foo");
      expect(getFileNameFromPath("/file.jpg")).toBe("file");
      expect(getFileNameFromPath("/file.foo.jpg")).toBe("file.foo");
      expect(getFileNameFromPath("file.jpg")).toBe("file");
      expect(getFileNameFromPath("file.foo.jpg")).toBe("file.foo");
    });
  });

  describe("isImageFile", () => {
    it("it checks if the filename is compatible with an image", () => {
      expect(isImageFile("example.jpg")).toBe(true);
      expect(isImageFile("example.jpeg")).toBe(true);
      expect(isImageFile("example.gif")).toBe(true);
      expect(isImageFile("example.png")).toBe(true);
      expect(isImageFile("example.txt")).toBe(false);
      expect(isImageFile("example")).toBe(false);
      expect(isImageFile(".DS_Store")).toBe(false);
    });
  });
});
