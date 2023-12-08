import { promises as fs } from "fs";
import sharp from "sharp";
import main from "../src/index";

const sourceFolder = "test/files/src";
const destFolder = "test/files/dest";
const expectedFolder = "test/files/expected";

const compareImage = async (fileName) => {
  // check sizes
  const { width: destWidth, height: destHeight } = await sharp(
    `${destFolder}/${fileName}`
  ).metadata();

  const { width: expectedWidth, height: expectedHeight } = await sharp(
    `${expectedFolder}/${fileName}`
  ).metadata();
  expect(destWidth).toBe(expectedWidth);
  expect(destHeight).toBe(expectedHeight);

  // check data
  const destImage = await fs.readFile(`${destFolder}/${fileName}`);
  const expectedImage = await fs.readFile(`${expectedFolder}/${fileName}`);
  expect(destImage).toEqual(expectedImage);
};

describe("integration tests", () => {
  afterEach(async () => {
    await fs.rm(destFolder, { recursive: true });
  });

  describe("resize a single image", () => {
    it("resize an horizontal image", async () => {
      await main(`${sourceFolder}/horizontal1.jpeg`, destFolder);

      const destFiles = [
        "horizontal1-1.jpg",
        "horizontal1-2.jpg",
        "horizontal1-3.jpg",
      ];
      for (const destFile of destFiles) {
        await compareImage(destFile);
      }
    });

    it("resize a vertical image", async () => {
      await main(`${sourceFolder}/vertical1.jpeg`, destFolder);
      await compareImage("vertical1-1.jpg");
    });

    it("resize a square image", async () => {
      await main(`${sourceFolder}/square.jpeg`, destFolder);
      await compareImage("square-1.jpg");
    });
  });

  describe("resize multiple images inside a folder", () => {
    it("resize a folder with multiple images", async () => {
      await main(`${sourceFolder}/`, destFolder);

      const destFiles = [
        "horizontal1-1.jpg",
        "horizontal1-2.jpg",
        "horizontal1-3.jpg",
        "horizontal2-1.jpg",
        "horizontal2-2.jpg",
        "horizontal2-3.jpg",
        "horizontal3-1.jpg",
        "horizontal3-2.jpg",
        "horizontal3-3.jpg",
        "square-1.jpg",
        "vertical1-1.jpg",
        "vertical2-1.jpg",
      ];
      for (const destFile of destFiles) {
        await compareImage(destFile);
      }
    }, 40000);
  });
});
