const fs = jest.createMockFromModule("fs");

const statMock = (path) => {
  if (path === "path/to/existing/directory") {
    return Promise.resolve({ isDirectory: () => true, isFile: () => false });
  } else if (path === "path/to/new/directory") {
    return Promise.resolve({ isDirectory: () => false, isFile: () => false });
  } else if (path === "path/to/file") {
    return Promise.resolve({ isDirectory: () => false, isFile: () => true });
  } else if (path === "path/to/unknown") {
    return Promise.resolve({ isDirectory: () => false, isFile: () => false });
  } else if (path === "path/to/enoent/error") {
    const error = new Error();
    error.code = "ENOENT";
    return Promise.reject(error);
  } else {
    const error = new Error();
    error.code = "ANY";
    return Promise.reject(error);
  }
};

fs.promises = {
  stat: jest.fn().mockImplementation(statMock),
  lstat: jest.fn().mockImplementation(statMock),
  mkdir: jest.fn().mockResolvedValue(undefined),
  readdir: jest.fn().mockResolvedValue(["file-1.jpg", "file-2.jpg"]),
};

module.exports = fs;
