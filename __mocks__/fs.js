const fs = jest.createMockFromModule("fs");

fs.promises = {
  stat: jest.fn().mockImplementation((path) => {
    if (path === "path/to/existing/directory") {
      return Promise.resolve({ isDirectory: () => true });
    } else if (path === "path/to/new/directory") {
      return Promise.resolve({ isDirectory: () => false });
    } else if (path === "path/to/enoent/error") {
      const error = new Error();
      error.code = "ENOENT";
      return Promise.reject(error);
    } else {
      const error = new Error();
      error.code = "ANY";
      return Promise.reject(error);
    }
  }),
  mkdir: jest.fn().mockResolvedValue(undefined),
};

module.exports = fs;
