# gen-lica

A simple and fast CLI tool to generate a LICENSE file for your open-source projects.

## Why `gen-lica`?

Choosing and creating a license file is a crucial step for your project. This tool automates the process, allowing you to generate a standard LICENSE file with a single command.

```bash
Usage: gen-lica [options] [dir]

A CLI tool to quickly generate LICENSE files for your projects.

Arguments:
  dir                    The directory where the LICENSE file should be generated. (default: ".")

Options:
  -V, --version          output the version number
  -l, --license <type>   License's SPDX ID i.e `spdx_id` (e.g: 'mit', 'lgpl-2.1' etc.) (default: "mit")
  -n, --name <username>  Your GitHub username (e.g 'abhinab-choudhury')
  -p, --pkg              Write into package.json (default: true)
  -f, --force            Overwrite the LICENSE file if it already exists. (default: false)
  -h, --help             display help for command
````

## Installation

Install the package globally using npm:

```bash
npm install -g gen-lica
```

## Usage

You can generate a LICENSE file with a single command.

```bash
# Generate a LICENSE.md file (MIT by default) in the current directory
npx gen-lica

# Overwrite LICENSE.md file if exits
npx gen-lica -f 
```

##### Arguments

| Argument | Description                                               | Default           |
| -------- | --------------------------------------------------------- | ----------------- |
| `dir`    | The directory where the LICENSE file should be generated. | `.` (current dir) |

##### Options

| Option                  | Description                                                   | Default |
| ----------------------- | ------------------------------------------------------------- | ------- |
| `-V, --version`         | Output the version number                                     | –       |
| `-l, --license <type>`  | License’s SPDX ID i.e `spdx_id` (e.g: 'mit', 'lgpl-2.1' etc.) | `mit`   |
| `-n, --name <username>` | Your GitHub username (e.g. 'abhinab-choudhury')               | –       |
| `-p, --pkg`             | Write into package.json (use `--no-pkg` to disable)           | `true`  |
| `-f, --force`           | Overwrite the LICENSE file if it already exists               | `false` |
| `-h, --help`            | Display help for command                                      | –       |

---

#### License

This project is licensed under the MIT License.
