#!/usr/bin/env node

import inquirer from "inquirer";
import "inquirer-search-list";
import * as fs from "fs";
import { getLanguages } from "./helper";
import chalk from "chalk";


inquirer.registerPrompt("search-list", require("inquirer-search-list"));

(async function () {
  const languages = await getLanguages();

  const { language } = await (inquirer.prompt as any)([
    {
      type: "search-list" as const,
      name: "language",
      message: "Choose Language: ",
      choices: languages,
    },
  ]);

  console.log(chalk.red(`Fetching gitignore for, ${language} ......`));

  try {
    const gitignore_lang = await fetch(
      `https://www.toptal.com/developers/gitignore/api/${language}/`,
    );
    const response = await gitignore_lang.text();
    if (fs.existsSync(".gitignore")) {
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "continue",
            message:
              ".gitignore already exists do you want to overwrite or cancel:",
            default: false,
          },
        ])
        .then((user_response) => {
          if (user_response.continue) {
            fs.writeFile(".gitignore", response, (err) => {
              if (err) throw err;
              console.log("The file has been saved!");
            });
          }
        });
    } else {
      fs.writeFile(".gitignore", response, (err) => {
        if (err) {
          throw new Error(chalk.red((err as Error).message));
        }
        console.log("The file has been saved!");
      });
    }
  } catch (err) {
    console.error(chalk.red(`Error fetching gitignore:, ${(err as Error).message}`));
  }
})();
