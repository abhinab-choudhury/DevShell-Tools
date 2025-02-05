import shell from 'shelljs';
import path from 'path';

// Resolve absolute paths
const files = [
  path.resolve('./src/index.ts'),
  path.resolve('package.json'),
];

// Debug file paths
console.log('Reading files:', files);

// Check if files exist
files.forEach((file) => {
  if (!shell.test('-f', file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }
});

// Read and print file contents
const content = shell.cat(files);
if (content.code !== 0) {
  console.error('Error reading files:', content.stderr);
} else {
  console.log(content.stdout);
}
