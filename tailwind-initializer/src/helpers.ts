import path from 'path';

export const rootDir = path.resolve(process.cwd());

export interface ResponseInterface {
  stack: string;
  package_manager: string;
  project_name: string;
}
