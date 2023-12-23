import { promises as fs } from "fs";
import { ErrnoException } from "../../types/errno-expection";

export const createDirectory = async (directoryPath: string) => {
  try {
    const directoryExists = await fs.stat(directoryPath);
    if (directoryExists.isDirectory()) {
      return;
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const errnoError = error as ErrnoException;
      if (errnoError.code !== "ENOENT") {
        throw errnoError;
      }
    }
  }

  await fs.mkdir(directoryPath, { recursive: true });
};

export const getFileNameFromPath = (filePath: string) => {
  const filePathParts = filePath.split("/");
  const fileNameWithExtension = filePathParts[filePathParts.length - 1]!;
  return fileNameWithExtension.split(".").slice(0, -1).join(".");
};

export const isImageFile = (filename: string) => {
  const extensionRegex = /\.(jpg|jpeg|png|gif)$/i;
  return extensionRegex.test(filename);
};
