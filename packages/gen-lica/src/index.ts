#!/usr/bin/env node

import { Command } from "commander";
import path from "node:path";
import * as p from "@clack/prompts";
import chalk from "chalk";
import fs from "node:fs";
import { generateLicense } from "./actions";
import { getLicenseList, licenses } from "./utils";
import pkg from "./../package.json";


const program = new Command();

program
  .name("gen-lic")
  .description(
    "A CLI tool to quickly generate LICENSE files for your projects.",
  )
  .version(pkg.version)
  .argument(
    "[dir]",
    "The directory where the LICENSE file should be generated.",
    ".",
  )
  .option(
    "-l, --license <type>",
    "License's SPDX ID i.e `spdx_id` (e.g: 'mit', 'lgpl-2.1' etc.)",
    "mit",
  )
  .option(
    "-n, --name <username>",
    "Your Github username (e.g 'abhinab-choudhury')",
  )
  .option("-p, --pkg", "Write into package.json", true)
  .option(
    "-f, --force",
    "Overwrite the LICENSE file if it already exists.",
    false,
  )
  .action(async (dir, options) => {
    await getLicenseList()

    const userInputs = await p.group({
      dir: () =>
        p.text({
          message: "Enter target directory",
          placeholder: ".",
          defaultValue: ".",
        }),
      license: () =>
        p.select({
          message: "Choose the License",
          options: licenses.length ? licenses.map((lica): { label: string; value: string } => {
            return {
              label: lica.name,
              value: lica.spdx_id,
            };
          }) : [{ label: "MIT License", value: "MIT" }],
          initialValue: "mit"
        }),
      githubUsername: () =>
        p.text({
          message: "Enter you github username",
        }),
      packageJSON: () =>
        p.confirm({
          message: "Write package.json",
        }),
    }, {
      onCancel: () => {
        process.exit(0);
      },
    });

    dir = userInputs.dir;
    options.license = userInputs.license;
    options.name = userInputs.githubUsername;
    options.pkg = userInputs.packageJSON;

    try {
      const targetDir = path.join(process.cwd(), dir);
      await fs.promises.mkdir(targetDir, { recursive: true });

      const filePath = path.join(targetDir, "LICENSE.md");

      if (fs.existsSync(filePath) && !options.force) {
        console.error(chalk.red("LICENSE.md already exists, try again with -f flag."));
        process.exit(0);
      }

      const s = p.spinner();
      s.start("Fetching Licenses...");

      await generateLicense(filePath, options.name, options.license, options.pkg);

      s.stop(`LICENSE.md generated successfully`);
    } catch (err) {
      console.error("Error:", (err as Error).message || "Unknown error occurred.");
      process.exit(0);
    }
  });

program.parse();
