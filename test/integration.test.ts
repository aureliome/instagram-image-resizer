import main from "../src/index";

describe("integration tests", () => {
  beforeEach(() => {
    // TODO: clean test/files/dest/
  });

  describe("resize a single image", () => {
    it("resize an horizontal image", async () => {
      await main("test/files/src/horizontal1.jpeg", "test/files/dest");
    });

    it("resize a vertical image", async () => {
      await main("test/files/src/vertical1.jpeg", "test/files/dest");
    });

    it("resize a square image", async () => {
      await main("test/files/src/square.jpeg", "test/files/dest");
    });
  });

  describe("resize multiple images inside a folder", () => {
    it("resize a folder with multiple images", async () => {
      await main("test/files/src/", "test/files/dest/");
    });
  });
});
