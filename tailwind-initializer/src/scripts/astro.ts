import { ResponseInterface } from "../helpers.js";

async function init(package_manager:string, project_name: string): Promise<void> {
  
}

async function installTailwind(package_manager:string, project_name: string): Promise<void> {

}

export default async function astroInit(response: ResponseInterface) {
    try {
        await init(response.package_manager, response.project_name);
        await installTailwind(response.package_manager, response.project_name);
    } catch (error) {
      console.error('Failed to create Astro Project\n', error);
        process.exit(1);
    }
}