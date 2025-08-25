import chalk from "chalk";
import { match } from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { licenseNames, licenses } from ".";
import { License } from "./types";

async function getGithubDetails(username: string): Promise<any> {
  try {
    const githubResponse = await fetch(
      `https://api.github.com/users/${username}`,
    ).then((res) => res.json());
    return githubResponse;
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}

function getLicense(licenseSpdxID: string): License | undefined {
  try {
    const license = licenses.find(
      (lica: License) => lica.spdx_id === licenseSpdxID,
    );
    return license;
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}

function parseLicense(body: string, name: string): string {
  try {
    const currYear = new Date().getFullYear();
    const replaceList = [
      {
        match: [/\[year]/, /\[yyyy]/, /<year>/],
        replace: currYear.toString(),
      },
      {
        match: [
          /\[fullname]/,
          /\[name of copyright owner]/,
          /<name of author>/,
        ],
        replace: name,
      },
    ];

    for (const rule of replaceList) {
      for (const match of rule.match) {
        const regex = new RegExp(match, "g");
        body = body.replace(regex, rule.replace);
      }
    }
    return body;
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}

async function writeLicenseFile(
  license: License,
  path: string,
  username: string,
) {
  try {
    const licenseBody = await fetch(license.url)
      .then((res) => res.json())
      .then((res) => res?.body);
    const githubUserDetails = await getGithubDetails(username);
    const parsedBody = parseLicense(
      licenseBody,
      githubUserDetails?.name ?? username,
    );
    fs.promises.writeFile(path, parsedBody);
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

async function writeWithPackageJSON(license: License) {
  try {
    const packageJSONPath = path.join(process.cwd(), "package.json");
    const packageJSONFile = await fs.promises.readFile(packageJSONPath, {
      encoding: "utf-8",
    });
    const packageJSON = JSON.parse(packageJSONFile);
    packageJSON.license = license.spdx_id;
    await fs.promises.writeFile(
      packageJSONPath,
      JSON.stringify(packageJSON, null, 2),
    );
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}

export async function generateLicense(
  absPath: string,
  username: string,
  licenseSpdxID: string,
  packagejson: boolean,
) {
  try {
    if (!licenseNames.includes(licenseSpdxID)) {
      throw new Error(chalk.red(`Invalid License SPDX ID: ${licenseSpdxID}`));
    }
    const githubDetails = await getGithubDetails(username);
    const licenseObject = getLicense(licenseSpdxID)!;

    await writeLicenseFile(licenseObject, absPath, githubDetails?.name).then(
      async () => {
        if (packagejson) {
          await writeWithPackageJSON(licenseObject);
        }
      },
    );
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}
