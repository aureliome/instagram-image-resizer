import { logSuccessfulImageCreation } from "./logger";

describe("logger", () => {
  describe("logSuccessfulImageCreation", () => {
    beforeEach(() => {
      global.console = { ...console, log: jest.fn() };
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("logSuccessfulImageCreation", () => {
      const imagePath = "path/to/image";
      logSuccessfulImageCreation(imagePath);
      expect(console.log).toHaveBeenCalledWith(
        `Image '${imagePath}' created successful`
      );
    });
  });
});
