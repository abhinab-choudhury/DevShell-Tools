import shell from "shelljs";
import ora from "ora";

import {getInstallCmd, IUser, setupPrettierConfig} from "../helper.js";

/**
 * Executes a Vite command using shelljs with a progress spinner.
 * @param command - The Vite command to execute.
 * @param package_manager - The package manager to use (e.g., "npm", "yarn", "pnpm").
 */
function runVite(command: string, package_manager: string) {
    
    try {
        const spinner = ora("Installing Vite...").start();

        const installCommand =
            package_manager === "yarn"
                ? `${package_manager} add vite`
                : `${package_manager} install vite`;
        const installResult = shell.exec(installCommand, { silent: true });
        if (installResult.code !== 0) {
            spinner.fail("Failed to install Vite.");
            throw new Error(
                `Package installation failed: ${installResult.stderr || "Unknown error."}`
            );
        }
        spinner.succeed("Vite installed Successfully.");

        spinner.start(`Executing command: ${command}`);
        const viteResult = shell.exec(command, {async: false, silent: true});
       
        if(viteResult.code != 0){
            spinner.fail(`Command "${command}" failed.`);
            console.error(`❌ Error: Command execution failed.`);
            console.error(`🔍 Details: ${viteResult.stderr || "No additional information."}`);
            shell.exit(1);
        }

        spinner.succeed(`command ${command} execuated successfully`);
    } catch(error: any | unknown) {
        console.error(`❌ Error: ${error.message || error}.`);
        shell.exit(1); 
    }
}

/**
 * Sets up a client project using Vite with the specified user requirements.
 * It creates the project directory, initializes a Vite project with the desired template,
 * and optionally installs Prettier and TailwindCSS.
 * 
 * @param user_requirements - An object containing the user preferences for setting up the project.
 * @param user_requirements.project_name - The name of the project directory to create. 
 *                                          If "." is provided, the current directory is used.
 * @param user_requirements.package_manager - The package manager to use (e.g., "npm", "yarn", "pnpm").
 * @param user_requirements.swc - A boolean indicating whether to enable SWC support for the Vite project.
 * @param user_requirements.ts - A boolean indicating whether to set up the Vite project with TypeScript.
 * 
 * @throws Will throw an error if any command execution fails.
 */

export async function setupClient(user_requirements:IUser) {
    try {
        // initialise a spinner
        const spinner = ora("Starting the process...").start();
    
        // makeing the root folder
        user_requirements.project_name !== "." ? shell.mkdir(user_requirements.project_name) : shell.mkdir();
    
        // cd <project name>
        shell.cd(user_requirements.project_name);
        
        // create client folder with vite-cli
        let vite_prompt = "npm create vite@latest client -- --template react"
        vite_prompt += `${user_requirements.swc ? "-swc" : ""}${user_requirements.ts ? "-ts" : ""}`;
        
        // vite-cli
        runVite(vite_prompt, user_requirements.package_manager);
        spinner.succeed("client folder initialized completed");

        shell.cd("./client")
        
        // Installing Packages
        const install_command = await getInstallCmd(user_requirements);
        spinner.start(`cd client && ${install_command}`)
        shell.exec(install_command)
        spinner.succeed('Packages installed completed');
        
        // setup prettier and tailwind-css in client folder
        spinner.start("Setting up .prettierrc");
        if(user_requirements.prettier === "both" || user_requirements.prettier === "client") {
            shell.touch([".prettierrc", ".prettierignore"])
            // installing dev dependencies
            shell.exec(`${user_requirements.package_manager} ${user_requirements.package_manager === "yarn" ? "add" : "install"} ${user_requirements.package_manager === "yarn" ? "--dev" : "-D"} prettier eslint prettier eslint-config-prettier eslint-plugin-prettier`)
            // setup .prettierrc
            setupPrettierConfig()
        }
        spinner.stop();

        shell.cd("./../");

    } catch (error:any | unknown) {
        console.log(`Error:${error.message || error}`)
    }
}

