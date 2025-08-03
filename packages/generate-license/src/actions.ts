import fs from "node:fs";
import { exit } from "node:process";
import path from "node:path";

function getLicense(license_name: string) {
  let content;
  switch (license_name) {
    case "mit": {
      content = fs.readFileSync(path.join(__dirname, "./templates/mit.md"));
      break;
    }
    case "apache": {
      content = fs.readFileSync(path.join(__dirname, "./templates/apache2.0"));
      break;
    }
    default: {
      content = ``;
    }
  }

  return content;
}

export function generateLicense(
  path: string,
  license_name: string,
  force: boolean,
) {
  if (force) {
    fs.writeFileSync(path, getLicense(license_name));
  } else {
    if (fs.existsSync(path)) {
      console.error("LICENSE file already exists!!\ntry using -f flag");
      return;
    } else {
      fs.writeFileSync(path, getLicense(license_name));
    }
  }
}
