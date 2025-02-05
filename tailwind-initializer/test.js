import { exec } from 'child_process';

function checkGlobalLibrary(library) {
  exec(`npm list -g ${library}`, { shell: true }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error checking library: ${stderr}`);
      return;
    }
    if (stdout.includes(library)) {
      console.log(`${library} is installed globally.`);
    } else {
      console.log(`${library} is NOT installed globally.`);

      const command = `npm install -g --force @angular/cli`;
      exec(command, (error) => {
        if (error) {
          console.log('Error: ', error);
          process.exit(1);
        } else {
          console.log(`@angular/cli installed successfully`);
          // call the setup command;
        }
      });
    }
  });
}

// Example usage
checkGlobalLibrary('@angular/cli');
