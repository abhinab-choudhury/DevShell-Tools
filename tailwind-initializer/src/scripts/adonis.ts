import inquirer from 'inquirer';
import ora from 'ora';
import * as fs from 'node:fs';
import { spawn } from 'child_process';
import { ResponseInterface, rootDir } from '../helpers.js';
import path from 'path';

interface AdonisInit {
  auth: string;
  db: string;
}

function updateHomePage(project_name: string) {
  const content = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="h-screen flex items-center justify-center">
        <div class="text-center text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          <p class="animate__animated animate__fadeIn">Hello World!</p>
        </div>
    </body>
  </html>
  `

  const dirPath = path.join(rootDir, project_name, 'resources', 'views', 'pages');
  const filePath = path.join(dirPath, 'home.edge');

  if(fs.existsSync(dirPath)) {
    console.log('Writing into ./resources/views/pages/home.edge..');
    fs.writeFileSync(filePath, content);
    console.log('home.edge written successfully.\n');

  } else {
    console.log(`${dirPath} not found`);
    process.exit(1);
  }

}

function writeCSS(project_name: string) {
  const css = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }
  `;
  const dirPath = path.join(rootDir, project_name, 'resources', 'css');
  const filePath = path.join(dirPath, 'app.css');

  if(fs.existsSync(dirPath)) {
    console.log('Writing into ./resources/css/app.css...');
    fs.writeFileSync(filePath, css)
    console.log('app.css written successfully.\n');

    updateHomePage(project_name);
  } else {
    console.log(`${dirPath} not found`);
    process.exit(1);
  }
}

function writeTailwindConfig(project_name: string) {
  const tailwind_config = `
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./resources/**/*.edge",
      "./resources/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  `;
  
  const dirPath = path.join(rootDir, project_name);
  const filePath = path.join(dirPath, 'tailwind.config.js');

  console.log('\n\nDirPath: ', dirPath, "\nFilePath: ", filePath);
  if(fs.existsSync(dirPath)) {
    console.log('Writing into tailwind.config.js...');
    fs.writeFileSync(filePath, tailwind_config);
    console.log('tailwind.config.js written successfully.\n');

    writeCSS(project_name);
  } else {
    console.log(`${dirPath} not found`);
    process.exit(1);
  }
}

async function init(
  package_manager: string,
  project_name: string
): Promise<void> {
  const adonisSetup = await inquirer.prompt<AdonisInit>([
    {
      type: 'list',
      name: 'auth',
      message: 'Which authentication guard you want to use:',
      choices: ['Session', 'Access Token', 'Basic Auth', 'Skip'],
    },
    {
      type: 'list',
      name: 'db',
      message: 'Which database driver you want to use:',
      choices: ['SQLite', 'LibSQL', 'MySQL', 'PostgreSQL', 'MS SQL', 'Skip'],
    },
  ]);

  const installCommand = (() => {
    switch (package_manager) {
      case 'npm':
        return 'npm init';
      case 'yarn':
        return 'yarn create';
      default:
        return 'yarn create';
    }
  })();

  const commandParts = [
    `${installCommand} adonisjs ${project_name}`,
    '--kit="web"',
    `--pkg="${package_manager}"`,
  ];

  commandParts.push(
    `--db="${adonisSetup.db.replace(/\s+/g, '').toLowerCase()}"`
  );
  commandParts.push(
    `--auth-guard="${adonisSetup.auth.replace(/\s+/g, '_').toLowerCase()}"`
  );

  const command = commandParts.join(' ');

  console.log(`${command}`);
  const spinner = ora().start();
  spinner.render();

  try {
    await new Promise<void>((resolve, reject) => {
      const [mainCommand, ...args] = commandParts;
      const child = spawn(mainCommand, args, { stdio: 'inherit', shell: true });

      child.on('error', (error) => {
        spinner.fail(`Failed to execute command: ${error.message}`);
        reject(new Error(`Failed to spawn child process: ${error.message}`));
      });

      child.on('close', (code) => {
        if (code === 0) {
          spinner.succeed('Command executed successfully.');
          resolve();
        } else {
          spinner.fail(`Command exited with code ${code}.`);
          reject(new Error(`Command exited with code ${code}`));
        }
      });

      process.on('SIGINT', () => {
        spinner.warn('Terminating process...');
        if (!child.killed) {
          child.kill('SIGINT');
        }
        reject(new Error('Process terminated by user'));
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('Error during Adonis setup:', error);
    process.exit(1);
  }
}

async function installTailwind(package_manager: string, project_name: string) {
  const installCmd = (() => {
    switch (package_manager) {
      case 'npm':
        return 'npm install';
      case 'yarn':
        return 'yarn add';
      default:
        return 'yarn add';
    }
  })();

  const command = `cd ${project_name} && ${installCmd} -D tailwindcss postcss autoprefixer && ${package_manager} tailwindcss init -p && cd ..`;
  console.log(`Executing: ${command}`);
  const spinner = ora().start();
  spinner.render();

  try {
    await new Promise<void>((resolve, reject) => {
      const child = spawn(command, {
        stdio: 'inherit',
        shell: true, // Enables shell mode for `&&` to work
      });

      child.on('error', (error) => {
        spinner.fail(`Failed to execute command: ${error.message}`);
        reject(error);
      });

      child.on('close', (code) => {
        if (code === 0) {
          spinner.succeed(
            'Dependencies installed and Tailwind initialized successfully.'
          );
          resolve();
        } else {
          spinner.fail(`Command exited with code ${code}.`);
          reject(new Error(`Process exited with code ${code}`));
        }
      });

      process.on('SIGINT', () => {
        spinner.warn('Terminating process...');
        if (!child.killed) {
          child.kill('SIGINT');
        }
        reject(new Error('Process terminated by user'));
        process.exit(1);
      });
    });

    writeTailwindConfig(project_name);

  } catch (error) {
    console.error(`Error during Tailwind installation: ${error}`);
    process.exit(1);
  }
}

export default async function adonisInit(response: ResponseInterface) {
  try {
    await init(response.package_manager, response.project_name);
    await installTailwind(response.package_manager, response.project_name);
  } catch (error) {
    console.error('Failed to create Adonis Project\n', error);
  }
}
