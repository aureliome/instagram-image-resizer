# Contribute

This library is written in [TypeScript](https://www.typescriptlang.org/).

## Getting started

After you have cloned this repository you can:

```bash
# 1. install dependencies
npm install

# 2. run all tests (unit and integration)
npm test

# 3. build the distribution files
npm run build

# 4. try the library
npm start
```

`npm start` will take files from `test/files/src` and create new resized files in `output/` folder.

## Commands

### Clean

It cleans `.parcel-cache/`, `dist/` and `output/` folders:

```bash
npm run clean
```

### Build

The library uses [Parcel](https://parceljs.org/) as build tool.

It builds distribution files in `dist/` folder:

```bash
npm run build
```

### Test

The library contains 2 kinds of tests: unit and integration.

```bash
# Run unit test
npm run test:unit

# Run integration tests
npm run test:integration

# Run unit and integration tests
npm test
```

All tests uses [Jest](https://jestjs.io/).

Integration tests uses [PixelMatch](https://github.com/mapbox/pixelmatch) and [jpeg-js](https://github.com/jpeg-js/jpeg-js) to compare expected and created images.

### Linting

The library uses [Typescript Eslint recommended rules](https://typescript-eslint.io/linting/typed-linting) and [Eslint Plugin Prettier](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#recommended-configuration) to lint the source code.

```bash
# Run linting check
npm run lint

# Run linting check + fix solvable linting errors
npm run lint:fix
```

Before every commit, [Husky library](https://typicode.github.io/husky/) runs linting check.

### Try

Run this command after `npm run build`:

```bash
npm start
```

It will take files from `test/files/src` and create new resized files in `output/` folder.

## Commitlint

This library follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) rules and use [Commitlint](https://commitlint.js.org/#/) and [Husky](https://typicode.github.io/husky/) to check commit message before every commit.

## Thanks

Special thanks to:
- [Sharp](https://github.com/lovell/sharp), unique real dependency of this library.

Thanks to:
- [Commitlint](https://commitlint.js.org/#/);
- [Eslint Plugin Prettier](https://github.com/prettier/eslint-plugin-prettier);
- [Husky](https://typicode.github.io/husky/);
- [Jest](https://jestjs.io/);
- [jpeg-js](https://github.com/jpeg-js/jpeg-js);
- [Parcel](https://parceljs.org/);
- [PixelMatch](https://github.com/mapbox/pixelmatch);
- [Typescript Eslint](https://typescript-eslint.io/).

## To Do

- Setup pipeline;
- add versioning library;
- add coverage threshold;
- add CI and Coverage badges.