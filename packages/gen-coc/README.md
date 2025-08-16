# gen-coc

A simple and fast CLI tool to generate a Code of Conduct for your open-source projects, based on the widely accepted Contributor Covenant.

## Why `gen-coc`?

Every open-source project needs a Code of Conduct to foster a welcoming and inclusive community. This tool automates the process, allowing you to generate a standard `CODE_OF_CONDUCT` file with a single command.

```bash
Usage: gen-coc [options] [dir] [ext] [lang]

Generates a new CODE_OF_CONDUCT file.

Arguments:
  dir    Directory to generate the file (default: ".")
  ext    File format (e.g., md, txt, adoc) (default: "md")
  lang   Language (e.g., english, bengali) (default: "english")

Options:
  -V, --version      Output the version number
  -f, --force        Overwrite file if it already exists (default: false)
  -i, --interactive  Run in interactive mode (default: false)
  -h, --help         Display help for command
```

## Installation

Install the package globally using npm:

```bash
npm install -g gen-coc
```

## Usage

You can generate a Code of Conduct file with a single command.

```bash
# Generate a CODE_OF_CONDUCT.md in the current directory
gen-coc

# Generate a file in a specific directory with a different format
gen-coc ./docs txt

# Specify language explicitly
gen-coc ./ adoc bengali

# Overwrite an existing file
gen-coc --force

# Use interactive mode
gen-coc --interactive
```

---

### Supported Formats & Languages

| Category  | Supported Values    |
| --------- | ------------------- |
| Formats   | `md`, `txt`, `adoc` |
| Languages | `english`, `bengali`|

---

## License

This project is licensed under the [MIT License](./license).