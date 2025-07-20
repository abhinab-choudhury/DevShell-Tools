#!/usr/bin/env node

import { Command } from "commander";
import { generateLicense } from "./actions";

const program = new Command();

program
  .name("generate-license")
  .description(
    "A CLI tool to quickly generate LICENSE files for your projects.",
  )
  .version("0.1.0")
  .argument(
    "[directory]",
    "The directory where the LICENSE file should be generated.",
    ".",
  )
  .option("-n, --name <type>", "Specify the license type to generate.", "mit")
  .option(
    "-f, --force",
    "Overwrite the LICENSE file if it already exists.",
    false,
  )
  .action(generateLicense);

program.parse();
