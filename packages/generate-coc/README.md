# generate-coc

A simple and fast CLI tool to generate a Code of Conduct for your open-source projects, based on the widely accepted Contributor Covenant.

## Why `generate-coc`?

Every open-source project needs a Code of Conduct to foster a welcoming and inclusive community. This tool automates the process, allowing you to generate a standard CODE_OF_CONDUCT.md file with a single command.

```bash
Usage: generate-coc [options] [command]

A CLI tool to quickly generate a Code of Conduct for your open-source projects.

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  init [options] [directory]  Initialize a new CODE_OF_CONDUCT file.
  help [command]              display help for command
```

## Installation

Install the package globally using npm:

```bash
npm install -g generate-coc
```

## Usage

You can generate a Code of Conduct file with a single command.

```bash
# Generate a CODE_OF_CONDUCT.md in the current directory
generate-coc init

# Generate a file in a specific directory with a different format
generate-coc init ./docs --format txt

# Overwrite an existing file
generate-coc init --force
```

Commands

- `init`
  This command initializes a new CODE_OF_CONDUCT file in the specified directory.

**Arguments**

| Argument    | Description                                       | Default                 |
| ----------- | ------------------------------------------------- | ----------------------- |
| `directory` | The directory where the file should be generated. | `.` (current directory) |

**Options**

| Option              | Alias | Description                               | Default |
| ------------------- | ----- | ----------------------------------------- | ------- |
| `--format <type>`   | `-f`  | Sets the output format for the file.      | `"md"`  |
| `--language <lang>` | `-l`  | Sets the output language for the file.    | `"en"`  |
| `--force`           |       | Overwrites the file if it already exists. | `false` |
| `--help`            | `-h`  | Displays the help menu for the command.   |         |

**Supported Formats & Languages**

| Category  | Supported Values    |
| --------- | ------------------- |
| Formats   | `md`, `txt`, `adoc` |
| Languages | `en` and etc        |

#### License

This project is licensed under the MIT License.
