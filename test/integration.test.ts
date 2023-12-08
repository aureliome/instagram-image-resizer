import { promises as fs } from "fs";
import jpeg from "jpeg-js";
import pixelmatch from "pixelmatch";
import main from "../src/index";

const sourceFolder = "test/files/src";
const destFolder = "test/files/dest";
const expectedFolder = "test/files/expected";

const compareImage = async (fileName) => {
  // read and decode the expected image
  const expectedImageData = await fs.readFile(`${destFolder}/${fileName}`);
  const expectedImage = jpeg.decode(expectedImageData);

  // read and decode the output image
  const outputImageData = await fs.readFile(`${expectedFolder}/${fileName}`);
  const outputImage = jpeg.decode(outputImageData);

  // check if the dimensions are the same
  expect(outputImage.width).toBe(expectedImage.width);
  expect(outputImage.height).toBe(expectedImage.height);

  // compare the images pixel by pixel
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const diff = pixelmatch(
    expectedImage.data,
    outputImage.data,
    null,
    expectedImage.width,
    expectedImage.height,
    { threshold: 0.1 }
  );

  // expect no difference
  expect(diff).toBe(0);
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
    });
  });
});
