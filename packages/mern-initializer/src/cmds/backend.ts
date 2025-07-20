import shell from "shelljs";
import { setupPrettierConfig } from "../helper.js";

export function setupServer(package_manager: string, ts: boolean, prettier: boolean | string) {
    shell.mkdir("server");
    shell.cd("server");
    shell.mkdir(["src"]); 
    shell.cd("src");
    shell.touch(["index.ts"]);
    shell.mkdir(["controller", "routes", "middlewares", "database", "models"])
    shell.cd("./../");
    
    
    shell.exec(`${package_manager} init -y`);
    
    shell.exec(`${package_manager} ${package_manager === "yarn" ? "add" : "install"} express mongoose body-parser`);
    shell.exec(`${package_manager} ${package_manager === "yarn" ? "add" : "install"} ${package_manager === "yarn" ? "--dev" : "-D"} nodemon`);

    // adding additional packages for typescript support
    if(ts) {
        shell.exec(`${package_manager} ${package_manager === "yarn" ? "add" : "install"} ${package_manager === "yarn" ? "--dev" : "-D"}  typescript ts-node @types/node @types/express @typescript-eslint/parser @typescript-eslint/eslint-plugin`);
        shell.exec(`${package_manager} tsc --init`);
    }
    
    // setup prettier
    if(prettier === "both" || prettier === "server") {
        shell.exec(`${package_manager} ${package_manager === "yarn" ? "add" : "install"} ${package_manager === "yarn" ? "--dev" : "-D"} prettier eslint prettier eslint-config-prettier eslint-plugin-prettier`);
        shell.touch([".prettierrc", ".prettierignore", "eslint.config.js"]);
        setupPrettierConfig()
    }
    
    shell.cd("./../");

    console.log("- Define rootDir and outDir in ts-config.json for server");
    console.log("- Update the package.json file and configure script")
}