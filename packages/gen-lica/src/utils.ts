import chalk from "chalk";
import { License } from "./types";

export let licenses: License[] = [];
export const licenseNames: string[] = [];

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
