# gen-git - GitIgnore Generator

gen-git is a CLI tool that allows developers to generate `.gitignore` files for different programming languages and frameworks with ease. It integrates with Toptal's GitIgnore API to fetch optimized `.gitignore` files and provides an interactive experience for users.

## Features

- Interactive CLI for selecting languages
- Supports multiple OS environments
- Fetches `.gitignore` templates from [Toptal GitIgnore API](https://www.toptal.com/developers/gitignore)
- Option to overwrite existing `.gitignore` files

## Installation

You can install `gen-git` globally using npm:

```sh
npm install -g gen-git
```

Alternatively, use `npx` to run without installation:

```sh
npx gen-git
```

## Usage

To generate a `.gitignore` file for a specific language:

```sh
gen-git
```

Follow the prompts to select a language and generate the `.gitignore` file.

If a `.gitignore` file already exists, you will be prompted to overwrite or cancel the operation.

## Example

```sh
? Choose Language: (Use arrow keys)
> Node.js
  Python
  Java
  Go
Fetching gitignore for Node.js......
The file has been saved!
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Toptal GitIgnore API](https://www.toptal.com/developers/gitignore) for providing `.gitignore` templates.
- The open-source community for inspiration and contributions.
