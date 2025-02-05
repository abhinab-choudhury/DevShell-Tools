import { exec } from 'child_process';
import { ResponseInterface } from '../helpers.js';

function checkAndInstallLibrary(library: string) {
  exec(`npm list -g ${library}`, { shell: 'true' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error checking library: ${stderr}`);
      return;
    }
    if (stdout.includes(library)) {
      console.log(`${library} is installed globally.`);
    } else {
      console.log(`${library} is NOT installed globally.`);

      // if not avilable then install the package globally if failed try installing manually with these
      // instruction
      const command = `npm install -g --force @angular/cli`;
      //   rewrite in spawn
      //   exec(command, (error) => {
      //     if(error) {
      //         console.log('Error: ', error);
      //         process.exit(1);
      //     } else {
      //         console.log(`@angular/cli installed successfully`);
      //         // call the setup command;
      //     }
      //   })
    }
  });
}

async function init(package_manager: string, project_name: string):Promise<void> {

}

async function installTailwind(package_manager:string, project_name:string):Promise<void> {

}

export default async function angularInit(response: ResponseInterface):Promise<void> {
  try {
    checkAndInstallLibrary('@angular/cli');
    await init(response.package_manager, response.project_name);
    await installTailwind(response.package_manager, response.project_name);
  } catch(error) {
    console.log('Failed to create Angular Project.\n',error);
    process.exit(1);
  }
}
