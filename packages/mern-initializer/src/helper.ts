import inquirer from "inquirer";
import shell from "shelljs";

export interface IUser {
    project_name: string;
    ts: boolean;
    swc: boolean;
    tailwind: boolean;
    prettier: string | boolean;
    package_manager: string;
}

export async function takeUserInput() {
    const user_requirements = await inquirer.prompt<IUser>([
        {
            type: "input",
            name: "project_name",
            message: "Enter the name of your MERN stack project:",
            default: "."
        },
        {
            type: "confirm",
            name: "ts",
            message: "Do you want to use Typescipt?",
            default: true,
        },
        {
            type: "confirm",
            name: "swc",
            message: "Do you want to use SWC?",
            default: false,
        },
        {
            type: "confirm",
            name: "tailwind",
            message: "Do you want to use Tailwind CSS?",
            default: true,
        },
        {
            type: "list",
            name: "prettier",
            message: "Do you want to use Prettier?",
            choices: [
            { name: "No", value: false },
            { name: "Only client-side", value: "client"},
            { name: "Only server-side", value: "server" },
            { name: "Both client and server side", value: "both" },
            ],
            default: "both",
        },
        {
            type: "list",
            name: "package_manager",
            message: "Which package manager do you prefer?",
            choices: ['npm', 'yarn', 'pnpm'],
            default: "yarn",
        },
    ]);

    return user_requirements;
}

export async function getInstallCmd(user_requirements: IUser) {
    let package_manager = user_requirements.package_manager
    
    return `${package_manager} ${package_manager === "yarn" ? "" : "install" }`;
}


export function setupPrettierConfig() {
    const prettierConfig = `
    {
        "semi": true,
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 80,
        "tabWidth": 2,
        "arrowParens": "always"
    }`;

    // Write the Prettier configuration to a .prettierrc file
    shell.echo(prettierConfig).to('.prettierrc');

    console.log("✅ .prettierrc file created successfully!");
}


export function setupClientEslintWithTSConfig() {
    const eslintConfig = `
    module.exports = {
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
            project: './tsconfig.json',
            },
        },
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:jsx-a11y/recommended',
            'plugin:import/errors',
            'plugin:import/warnings',
            'plugin:import/typescript',
            'plugin:prettier/recommended',
            'prettier/@typescript-eslint',
        ],
        plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'import', 'prettier'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'react/prop-types': 'off',
            'prettier/prettier': ['error'], // Add this line to enforce Prettier formatting
        },
        settings: {
            react: {
            version: 'detect',
            },
        },
    };
    `
    shell.rm(["eslint.config.js"])
    shell.echo(eslintConfig).to("eslint.config.js");

    console.log("✅ .eslint.config.js file created successfully!");
}