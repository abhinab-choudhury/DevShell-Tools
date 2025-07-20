#!/usr/bin/env node

// import { setTimeout } from 'node:timers/promises';
// import * as p from '@clack/prompts';
// import color from 'picocolors';
// import figlet from 'figlet';
// import {
//   onCancel,
//   checkSystemRequirements,
//   DjangoVersion,
//   PYTHON_DJANGO_COMPAT
// } from './utils.js';

// /**
//  * Start CLI prompt flow
//  */
// async function main() {
//   console.clear();

//   console.log("\n");
//   console.log(color.greenBright(figlet.textSync('Create Django Project', {
//     font: 'Slant',
//     horizontalLayout: 'controlled smushing',
//     verticalLayout: 'controlled smushing'
//   })));
//   console.log("\n");

//   await setTimeout(300);
//   p.intro(color.bgGreen(color.greenBright(' 🛠️ Create a Fullstack Django App ')));

//   checkSystemRequirements();

//   const config = await p.group(
//     {
//       packageManager: () =>
//         p.select({
//           message: '📦 Choose a package manager for Django:',
//           options: [
//             { value: "uv", label: "uv (Fast)" },
//             { value: "pip", label: "pip (Default)" }
//           ]
//         }),

//       djangoVersion: () =>
//         p.select({
//           message: '🧱 Select Django Version:',
//           options: Object.keys(PYTHON_DJANGO_COMPAT).map(version => ({
//             value: version,
//             label: `Django ${version}`
//           }))
//         }),

//       pythonVersion: ({ results }) => {
//         const version = (results.djangoVersion ?? "5.2") as DjangoVersion;
//         return p.select({
//           message: '🐍 Choose Compatible Python Version:',
//           options: PYTHON_DJANGO_COMPAT[version].map(v => ({
//             value: v,
//             label: `Python ${v}`
//           }))
//         });
//       },

//       includeDRF: () =>
//         p.confirm({ message: '🔌 Add Django REST Framework (DRF)?' }),

//       database: () =>
//         p.select({
//           message: '🗄️ Choose your Database:',
//           options: [
//             { value: 'sqlite', label: 'SQLite (Default)' },
//             { value: 'postgres', label: 'PostgreSQL' },
//             { value: 'mysql', label: 'MySQL' },
//             { value: 'mongodb', label: 'MongoDB' },
//             { value: 'none', label: 'None' }
//           ]
//         }),

//       frontendFramework: () =>
//         p.select({
//           message: '🧑‍🎨 Choose a Frontend Framework:',
//           options: [
//             { value: "react", label: "React.js" },
//             { value: "next", label: "Next.js" },
//             { value: "vue", label: "Vue.js" },
//             { value: "react-native", label: "React Native" },
//             { value: "", label: "None" }
//           ]
//         }),

//       useTypescript: () =>
//         p.confirm({ message: '📘 Use TypeScript for frontend?' }),

//       stylingFramework: () =>
//         p.select({
//           message: '🎨 Styling Framework:',
//           options: [
//             { value: "tailwindcss", label: "Tailwind CSS" },
//             { value: "bootstrap", label: "Bootstrap" },
//             { value: "css", label: "Vanilla CSS" }
//           ]
//         }),

//       useDocker: () =>
//         p.confirm({ message: '🐳 Use Docker?' }),

//       gitInit: () =>
//         p.confirm({ message: '🔧 Initialize Git & create first commit?' }),
//     },
//     {
//       onCancel,
//     }
//   );

//   if (p.isCancel(config)) return onCancel();

//   p.outro(`${color.green('✅ Project configuration complete!')}`);
//   console.log(config);
// }

// main().catch(console.error);

import { Command } from "commander";
import { initApi, initFullstack, initFrontend, initMobile } from './actions';

const program = new Command();

program
  .name("create-django-app")
  .description("A CLI to bootstrap modern Django projects with various configurations.")
  .version("0.1.0");

program.command('api')
  .description('Create a backend-only project with Django Rest Framework.')
  .argument('<projectName>', 'The name of the project directory.')
  .option('-d, --db <type>', 'Database type (postgres, mysql, sqlite, mongodb)', 'sqlite')
  .action(initApi);

program.command('fullstack')
  .description("Create a project with Django's templating engine and TailwindCSS.")
  .argument('<projectName>', 'The name of the project directory.')
  .option('-d, --db <type>', 'Database type (postgres, mysql, sqlite, mongodb)', 'sqlite')
  .action(initFullstack);

program.command('frontend')
  .description('Create a project with a decoupled frontend framework.')
  .argument('<projectName>', 'The name of the project directory.')
  .option('-t, --template <type>', 'Frontend framework (react, vue)', 'react')
  .option('-d, --db <type>', 'Database type (postgres, mysql, sqlite, mongodb)', 'sqlite')
  .action(initFrontend);

program.command('mobile')
  .description('Create a project with a React Native mobile frontend.')
  .argument('<projectName>', 'The name of the project directory.')
  .option('-d, --db <type>', 'Database type (postgres, mysql, sqlite, mongodb)', 'sqlite')
  .action(initMobile);


program.parse();
