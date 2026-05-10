# @zxcvbn-ts/dictionary-compression

[![NPM Version](https://img.shields.io/npm/v/@zxcvbn-ts/dictionary-compression)](https://www.npmjs.com/package/@zxcvbn-ts/dictionary-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight utility for dictionary compression and decompression using incremental encoding (prefix compression). This package is primarily used to optimize the bundle size of `@zxcvbn-ts` language packages by reducing the storage footprint of large wordlists.

## Purpose

The primary goal of this repository is to centralize the compression logic used across all zxcvbn-ts language packages. This avoids duplication of code and ensures that language packages remain lightweight.

## Usage

By default, all zxcvbn-ts language packages already include this functionality. As a user of zxcvbn-ts, you do not need to interact with or directly use this repository. It serves as a shared resource for the language packages themselves, not for end-users.

## Why This Repository?

Without this repository, each zxcvbn-ts language package would need to include its own compression and decompression logic, leading to larger bundle sizes. By consolidating this logic here, we ensure a more efficient and maintainable approach to handling language package compression.

## Features

- **Incremental Encoding**: Compresses wordlists by storing common prefixes as a single character (A-Z).
- **Order Preservation**: Maintains the original order of the input data using a separate index mapping (permutation).
- **Lightweight**: Zero runtime dependencies.
- **TypeScript Support**: Full type definitions included.
- **Dual Build**: Supports both CommonJS (CJS) and ES Modules (ESM).

## Requirements

- **Node.js**: 18.x or higher (recommended for testing/development).
- **Package Manager**: [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

## Installation

```bash
npm install @zxcvbn-ts/dictionary-compression
# or
yarn add @zxcvbn-ts/dictionary-compression
```

## Usage

### Compression

The `compress` function takes an array of strings and returns an object containing the compressed string and a permutation array to maintain the original order.

```typescript
import compress from '@zxcvbn-ts/dictionary-compression/compress'

const data = ['beta', 'alpha', 'alphabet']
const { compressedData, permutation } = compress(data)
// compressedData: "AalphaFbetAbeta"
// permutation: [2, 0, 1]
// A = 0 shared chars, F = 5 shared chars, A = 0 shared chars
```

**Constraints**: 
- Input must be an array of strings.
- Strings must not contain control characters or double quotes (`\x00-\x1f`, `\u2028`, `\u2029`, `\\`, `"`). If these are detected, compression is skipped and the original array is returned.
- Maximum prefix length supported is 25 characters (represented by 'Z').

### Decompression

The `decompress` function restores the original array from the compressed string and permutation array.

```typescript
import decompress from '@zxcvbn-ts/dictionary-compression/decompress'

const compressedData = 'AalphaFbetAbeta'
const permutation = [2, 0, 1]
const decompressed = decompress(compressedData, permutation)
// Result: ['beta', 'alpha', 'alphabet']
```

## Scripts

- `npm run build`: Bundles the project using `tsup` (outputs to `dist/`).
- `npm test`: Runs the test suite using `node:test` and `tsx`.
- `npm run typecheck`: Runs TypeScript compiler check (`tsc --noEmit`).
- `npm run lint`: Lints the codebase using ESLint and Prettier.

## Project Structure

```text
├── dist/               # Compiled files (CJS, ESM, Types)
├── src/                # Source code (TypeScript)
│   ├── compress.ts     # Compression logic
│   └── decompress.ts   # Decompression logic
├── tests/              # Test files (*.spec.ts)
├── package.json        # Project metadata and dependencies
├── tsup.config.ts      # Bundler configuration
└── tsconfig.json       # TypeScript configuration
```

## Development

The project uses `prefix compression` (also known as incremental encoding). The first character of each entry in the compressed string is a letter (A-Z) representing the length of the prefix shared with the previous entry (A=0, B=1, ..., Z=25).

### Environment Variables

*No specific environment variables are required for this project.*

## License

This project is licensed under the [MIT License](LICENSE).