import { promises as fs } from "fs";

export const createDirectory = async (directoryPath: string) => {
  try {
    const directoryExists = await fs.stat(directoryPath);
    if (directoryExists.isDirectory()) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.mkdir(directoryPath, { recursive: true });
};

export const getFileNameFromPath = (filePath: string) => {
  const filePathParts = filePath.split("/");
  const fileNameWithExtension = filePathParts[filePathParts.length - 1]!;
  return fileNameWithExtension.split(".").slice(0, -1).join(".");
};
