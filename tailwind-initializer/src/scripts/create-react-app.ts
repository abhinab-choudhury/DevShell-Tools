import { ResponseInterface } from "../helpers.js";

async function init(package_manager: string, project_name: string) {

}

async function installTailwind(package_manager: string, project_name: string) {

}

export default async function CRAInit(response:ResponseInterface) {
    try {
        await init(response.package_manager, response.project_name);
        await installTailwind(response.package_manager, response.project_name);
    } catch(error) {
        console.log('Failed create CRA Project.\n', error);
        process.exit(1);
    }
}