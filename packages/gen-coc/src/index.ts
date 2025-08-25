#!/usr/bin/env node

import pjson from "../package.json";
import { Command } from "commander";
import path from "node:path";
import fs from "node:fs";
import * as p from "@clack/prompts";
import { getFileContent } from "./actions.js";
import chalk from "chalk";

const program = new Command();

program
  .name("gen-coc")
  .description(
    "A CLI tool to quickly generate a Code of Conduct for your open-source projects.",
  )
  .version(pjson.version);

program
  .description("Generates a new CODE_OF_CONDUCT file.")
  .argument("[dir]", "Directory to generate the file", ".")
  .argument("[ext]", "File format (e.g., md, txt, adoc)", "md")
  .argument("[lang]", "Language (english and etc)", "english")
  .option("-f, --force", "Overwrite file if it already exists", false)
  .option("-i, --interactive", "Interactive mode", false)
  .action(async (dir, ext, lang, options) => {
    if (options.interactive) {
      const userInputs = await p.group(
        {
          dir: () =>
            p.text({
              message: "Enter target directory",
              defaultValue: ".",
            }),
          ext: () =>
            p.select({
              message: "Choose the file extension",
              options: [
                { label: "Markdown", value: "md" },
                { label: "Text", value: "txt" },
                { label: "ASCII Docs", value: "adoc" },
              ],
            }),
          lang: () =>
            p.select({
              message: "Choose a language:",
              options: [
                { label: "English", value: "english" },
                { label: "Bengali", value: "bengali" },
              ],
            }),
        },
        {
          onCancel: () => {
            process.exit(0);
          },
        },
      );

      dir = userInputs.dir;
      ext = userInputs.ext;
      lang = userInputs.lang;
    }
    try {
      const targetDir = path.resolve(process.cwd(), dir);
      fs.mkdirSync(targetDir, { recursive: true });

      const filePath = path.join(targetDir, `CODE_OF_CONDUCT.${ext}`);

      if (fs.existsSync(filePath) && !options.force) {
        console.error(chalk.red(`CODE_OF_CONDUCT.${ext} file already exists, Use -f to overwrite.`));
        process.exit(0);
      }

      const s = p.spinner();
      s.start("Fetching Code of Conduct...");

      const cocContent = await getFileContent(lang, ext);
      fs.writeFileSync(filePath, cocContent);

      s.stop(`CODE_OF_CONDUCT.${ext} generated successfully`);
    } catch (error: any) {
      console.error("Error:", error.message || "Unknown error occurred.");
      process.exit(0);
    }
  });

program.parse();
