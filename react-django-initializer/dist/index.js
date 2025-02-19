var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
function getUserInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const user_requirements = yield inquirer.prompt([
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
        console.log('User Requirements:', user_requirements);
    });
}
getUserInput();
