# generate-license 📄

A simple and fast CLI tool to generate a LICENSE file for your open-source projects.

## Why `generate-license`?

Choosing and creating a license file is a crucial step for every open-source project. This tool automates the process, allowing you to generate a standard LICENSE file with a single command.

```bash
Usage: generate-license [options] [directory]

A CLI tool to quickly generate LICENSE files for your projects.

Arguments:
  directory          The directory where the LICENSE file should be generated. (default: ".")

Options:
  -V, --version      output the version number
  -n, --name <type>  Specify the license type to generate. (default: "mit")
  -f, --force        Overwrite the LICENSE file if it already exists. (default: false)
  -h, --help         display help for command
```

## Installation

Install the package globally using npm:

```bash
npm install -g generate-license
```

## Usage

You can generate a LICENSE file with a single command.

```bash
# Generate a LICENSE file (MIT by default) in the current directory
generate-license

# Generate a specific license type (e.g., Apache 2.0)
generate-license --name "Apache-2.0"

# Generate a license in a specific directory and overwrite if it exists
generate-license ./docs --force
```

##### Arguments

| Argument  | Description                                               | Default           |
| --------- | --------------------------------------------------------- | ----------------- |
| directory | The directory where the LICENSE file should be generated. | `.` (current dir) |

##### Options

| Option              | Description                                     | Default |
| ------------------- | ----------------------------------------------- | ------- |
| `-V, --version`     | Output the version number                       | –       |
| `-n, --name <type>` | Specify the license type to generate            | `mit`   |
| `-f, --force`       | Overwrite the LICENSE file if it already exists | `false` |
| `-h, --help`        | Display help for command                        | –       |

#### License

This project is licensed under the MIT License.
