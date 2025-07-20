#!/usr/bin/env node

import { Command } from "commander";
import { generateCoc } from "./actions";

const program = new Command();

program
  .name("generate-coc")
  .description(
    "A CLI tool to quickly generate a Code of Conduct for your open-source projects.",
  )
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new CODE_OF_CONDUCT file.")
  .argument(
    "[directory]",
    "The directory where the file should be generated.",
    ".",
  )
  .option("-f, --format <type>", "Output format for the file", "md")
  .option("-l, --language <lang>", "Output language", "en")
  .option("--force", "Overwrite the file if it already exists.", false)
  .action(generateCoc);

program.parse();
