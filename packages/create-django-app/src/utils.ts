import color from 'picocolors';
import { execSync } from 'child_process';
import * as p from '@clack/prompts';

type DjangoVersion = '5.0' | '5.1' | '5.2';

const PYTHON_DJANGO_COMPAT: Record<DjangoVersion, string[]> = {
  "5.2": ["3.13", "3.12", "3.11", "3.10"],
  "5.1": ["3.13", "3.12", "3.11", "3.10"],
  "5.0": ["3.12", "3.11", "3.10"],
};

/**
 * Gracefully exit the CLI if user cancels.
 */
function onCancel() {
  p.cancel(color.red('⚠️ Operation cancelled.'));
  process.exit(0);
}

/**
 * Perform pre-flight system requirement checks:
 * Node.js >= 18, Python, Docker, and uv (optional)
 */
function checkSystemRequirements() {
  try {
    const nodeVersion = execSync('node -v').toString().trim();
    const majorVersion = parseInt(nodeVersion.replace(/^v/, '').split('.')[0], 10);
    if (majorVersion < 18) {
      p.cancel(color.red(`Node.js version must be >= 18. Found: ${nodeVersion}`));
      process.exit(1);
    }

    const pythonVersion = execSync('python3 --version || python --version').toString().trim();
    if (!pythonVersion.includes('Python')) {
      throw new Error();
    }

    const uvInstalled = execSync('which uv || where uv').toString().trim();
    if (!uvInstalled) {
      p.note(color.yellow('uv not found. Will fallback to pip.'), 'Dependency Warning');
    }

    const dockerInstalled = execSync('docker --version').toString().trim();
    if (!dockerInstalled.includes('Docker')) {
      p.note(color.yellow('Docker not installed. Docker-related setup will be skipped.'), 'Docker Warning');
    }

  } catch (err) {
    p.cancel(color.red('Missing required tools: Node.js (>=18), Python, Docker (optional)'));
    process.exit(1);
  }
}


export {
  onCancel,
  DjangoVersion,
  PYTHON_DJANGO_COMPAT,
  checkSystemRequirements
}