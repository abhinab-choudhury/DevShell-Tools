import figlet from "figlet";
import shell from "shelljs";
import { setupClient } from "./cmds/fontend.js";
import { takeUserInput } from "./helper.js";
import { setupServer } from "./cmds/backend.js";

figlet.text(
  "MERN Stack Builder",
  {
    font: "ANSI Shadow",
  },
  async function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);

    const user_requirements = await takeUserInput();
    user_requirements.project_name !== "." ? shell.mkdir(user_requirements.project_name) : shell.mkdir();
    shell.cd(user_requirements.project_name);

    try {   
      // setup client folder
      await setupClient(user_requirements);
      
      // setup necessary files at root dir
      shell.touch(["Dockerfile", "docker-compose.yml", "README.md", "LICENSE"])

      // setup server folder
      setupServer(user_requirements.package_manager, user_requirements.ts, user_requirements.prettier)
      
    } catch (error: any | unknown) {
      console.log("Error Occured: ", error.message || error)
      process.exit(1);
    }

  }
);

