export const urls = {
  english:
    "https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct",
  bengali:
    "https://www.contributor-covenant.org/bn/version/2/1/code_of_conduct/code_of_conduct",
};

export async function getFileContent(
  language: string,
  format: string,
): Promise<string> {
  let data;
  switch (language) {
    case "english": {
      data = await fetch(`${urls["english"]}.${format}`);
      break;
    }
    case "bengali": {
      data = await fetch(`${urls["bengali"]}.${format}`);
      break;
    }
    default: {
      throw Error("Language not supported");
    }
  }

  return await data.text();
}
