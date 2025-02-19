import inquirer from "inquirer";

async function getUserInput() {
    const user_requirements = await inquirer.prompt([
      {
        message: "Enter you Project Name:",
        name: "project_name",
        type: "input",
        default: ".",
      },
      {
        message: "Do you want to use Typescript for your frontend:",
        name: "ts",
        type: "confirm",
        default: true,
      },
      {
        message: "Choose your Python Backend:",
        name: "backend_technologies",
        type: "list",
        choices: [
          { name: "DRF-Django Rest Framwork", value: "drf" },
          { name: "Django", value: "django" },
          { name: "Flask", value: "flask" },
        ],
        default: "drf",
      }
    ]);
    console.log('User Requirements:',user_requirements);
}

getUserInput();