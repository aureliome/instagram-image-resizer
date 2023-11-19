#!/usr/bin/env node
const { argv } = require("node:process");
const main = require("./dist/main.js");

const sourcePath = argv[2];
const destPath = argv[3];

if (!sourcePath) {
  throw new Error(`
      You need to pass:
      - source path of file or folder as first argument
      - destination path as second argument
      Examples: 
        - instagram-image-resizer example/ output/
        - instagram-image-resizer example/horizontal.jpeg output/`);
}

if (!destPath) {
  throw new Error(`
      You need to pass destination path as second argument
      Examples: 
        - instagram-image-resizer example/ output/
        - instagram-image-resizer example/horizontal.jpeg output/`);
}

main.default(sourcePath, destPath);
