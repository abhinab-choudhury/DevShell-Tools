#!/usr/bin/env node

import { Command } from "commander";
import path from "node:path";
import * as p from "@clack/prompts";
import { License } from "./types";
import chalk from "chalk";
import fs from "node:fs";
import { generateLicense } from "./actions";

const program = new Command();

export let licenses: License[] = [];
export const licenseNames: string[] = [];

async function fileExists(absPath: string): Promise<boolean> {
  try {
    await fs.promises.access(absPath);
    return true;
  } catch {
    return false;
  }
}

export async function getLicenseList() {
  try {
    const licenseResponse = await fetch("https://api.github.com/licenses").then(
      (res) => res.json(),
    );
    if (Array.isArray(licenseResponse)) {
      licenses = licenseResponse;
      licenseResponse.forEach((license) => {
        licenseNames.push(license.spdx_id);
      });
    }
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}

program
  .name("gen-lic")
  .description(
    "A CLI tool to quickly generate LICENSE files for your projects.",
  )
  .version("0.1.0")
  .argument(
    "[dir]",
    "The directory where the LICENSE file should be generated.",
    ".",
  )
  .option(
    "-l, --license <type>",
    "Name of the License i.e `spdx_id` (e.g: 'mit', 'lgpl-2.1' etc.)",
    "mit",
  )
  .option(
    "-n, --name <username>",
    "Your Github username (e.g 'abhinab-choudhury')",
  )
  .option("-p, --pkg", "Write into package.json", true)
  .option("-i, --interactive", "Interactive mode", true)
  .option(
    "-f, --force",
    "Overwrite the LICENSE file if it already exists.",
    false,
  )
  .action(async (dir, options) => {
    let { license, name, pkg, interactive, force } = options;

    await getLicenseList()

    if (interactive) {
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
            options: license.length ? licenses.map((lica): { label: string; value: string } => {
              return {
                label: lica.name,
                value: lica.spdx_id,
              };
            }) : [{ label: "MIT License", value: "mit" }],
            initialValue: "mit"
          }),
        githubUsername: () =>
          p.text({
            message: "Enter you github username",
            placeholder: "abhinab-choudhury",
          }),
        packageJSON: () =>
          p.confirm({
            message: "Write package.json",
          }),
      });

      dir = userInputs.dir;
      license = userInputs.license;
      name = userInputs.githubUsername;
      pkg = userInputs.packageJSON;
    }

    try {
      const targetDir = path.join(process.cwd(), dir);
      await fs.promises.mkdir(targetDir, { recursive: true });

      const filePath = path.join(targetDir, "LICENSE.md");

      if (fs.existsSync(filePath) && !force) {
        console.error(chalk.red("LICENSE.md already exists, try again with -f flag."));
        process.exit(0);
      }

      const s = p.spinner();
      s.start("Fetching Licenses...");

      await generateLicense(filePath, name, license, pkg);

      s.stop(`LICENSE.md generated successfully`);
    } catch (err) {
      console.error("Error:", (err as Error).message || "Unknown error occurred.");
      process.exit(0);
    }
  });

program.parse();
