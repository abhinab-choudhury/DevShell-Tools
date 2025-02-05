import inquirer from 'inquirer';
import { ResponseInterface } from './helpers.js';
import adonisInit from './scripts/adonis.js';
import angularInit from './scripts/angular.js';
import astroInit from './scripts/astro.js';
import CRAInit from './scripts/create-react-app.js';
import emberInit from './scripts/ember.js';
import gatsbyInit from './scripts/gatsby.js';
import laravelInit from './scripts/laravel.js';
import meteorInit from './scripts/meteor.js';
import nextJSInit from './scripts/nextjs.js';
import nuxtInit from './scripts/nuxt.js';
import parcelInit from './scripts/parcel.js';
import phoenixInit from './scripts/phoenix.js';
import qwikInit from './scripts/qwik.js';
import remixInit from './scripts/remix.js';
import rspackInit from './scripts/rspack.js';
import rubyOnRailsInit from './scripts/ruby-on-rails.js';
import solidJsInit from './scripts/solidjs.js';
import svelteKitInit from './scripts/sveltekit.js';
import symfonyInit from './scripts/symfony.js';
import viteInit from './scripts/vite.js';

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
        'Create React App',
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
        'Ruby On Rails',
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
  
  console.log(`Setting up ${response.project_name}`);
  switch (response.stack.replace(/\s+/g, '_').toLowerCase()) {
    case 'adonis':
      await adonisInit(response);
      break;
    case 'angular':
      await angularInit(response);
      break;
    case 'astro':
      await astroInit(response);
      break;
    case 'create_react_app':
      await CRAInit(response);
      break;
    case 'ember':
      await emberInit(response);
      break;  
    case 'gatsby':
      await gatsbyInit(response);
      break;
    case 'laravel':
      await laravelInit(response);
      break;
    case 'meteor':
      await meteorInit(response);
      break;
    case 'nextjs':
      await nextJSInit(response);
      break;
    case 'nuxt':
      await nuxtInit(response);
      break;
    case 'parcel':
      await parcelInit(response);
      break;
    case 'phoenix':
      await phoenixInit(response);
      break;
    case 'qwik':
      await qwikInit(response);
      break;
    case 'remix':
      await remixInit(response);
      break;
    case 'rspack':
      await rspackInit(response);
      break;
    case 'ruby_on_rails':
      await rubyOnRailsInit(response);
      break;
    case 'solidjs':
      await solidJsInit(response);
      break;
    case 'sveltekit':
      await svelteKitInit(response);
      break;
    case 'symfony':
      await symfonyInit(response);
      break;
    case 'vite':
      await viteInit(response);
      break;                      
    default:
      console.log('Stack Not Supported.');
  }

  // implement a Linter Function here which will list all the code
  console.log('Run Format command to fix the linting.');
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
