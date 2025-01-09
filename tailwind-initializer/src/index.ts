import inquirer from 'inquirer';
import { ResponseInterface } from './helpers.js';
import adonisInit from './scripts/adonis.js';

(async () => {
  const response = await inquirer.prompt<ResponseInterface>([
    {
      type: 'list',
      name: 'stack',
      message: 'Choose Your Stack:',
      choices: [
        'Adonis',
        'Angular',
        'Astro',
        'Create-React-App',
        'Ember',
        'Gatsby',
        'Laravel',
        'Meteor',
        'Nextjs',
        'Nuxt',
        'Parcel',
        'Phoenix',
        'Qwik',
        'Remix',
        'Rspack',
        'Ruby-On-Rails',
        'Solidjs',
        'Sveltekit',
        'Symfony',
        'Vite',
      ],
    },
    {
      type: 'list',
      name: 'package_manager',
      message: 'Which Package Manager you want to Choose?',
      choices: ['npm', 'yarn'],
      default: 'yarn',
    },
    {
      type: 'input',
      name: 'project_name',
      message: 'Name of the Project:',
      default: 'my-project',
    },
  ]);

  // Example of handling response:
  switch (response.stack.toLowerCase()) {
    case 'adonis':
      console.log(`Setting up ${response.project_name}`);
      return adonisInit(response).then(() => {
        console.log('Run Format command to fix the linting.')
      });
    case 'angular':
      console.log('You selected Angular.');
      break;
    case 'astro':
      console.log('You selected Astro.');
      break;
    case 'create-react-app':
      console.log('You selected Create-React-App.');
      break;
    default:
      console.log('Stack Not Supported.');
  }

  console.log('Response :', response);
})();

// Global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception');
  process.exit(1);
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection');
  process.exit(1);
});
