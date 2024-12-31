import inquirer from "inquirer";
import * as fs from "fs";
import { languages } from "./helper";

inquirer.registerPrompt("search-list", require("inquirer-search-list"));

(async function () {
  // @ts-ignore
  const { language } = await inquirer.prompt([
    {
      type: "search-list",
      name: "language",
      message: "Choose Language: ",
      choices: languages.map((lang) => ({ name: lang, value: lang })),
    },
  ]);

  console.log("Fetching gitignore for", language, "......");

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
        if (err) throw err;
        console.log("The file has been saved!");
      });
    }
  } catch (error) {
    console.error("Error fetching gitignore:", error);
  }
})();
