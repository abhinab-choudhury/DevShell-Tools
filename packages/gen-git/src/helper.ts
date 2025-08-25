import chalk from "chalk";

export async function getLanguages(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://www.toptal.com/developers/gitignore/api/list"
    ).then((res) => res.text());

    const languages = response
      .split(/,|\n/)
      .map((language) => language.trim())
      .filter((lang) => lang.length > 0);

    return languages;
  } catch (err) {
    throw new Error(chalk.red((err as Error).message));
  }
}
