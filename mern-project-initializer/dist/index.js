var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import figlet from "figlet";
import shell from "shelljs";
import { setupClient } from "./cmds/fontend.js";
import { takeUserInput } from "./helper.js";
import { setupServer } from "./cmds/backend.js";
figlet.text("MERN Stack Builder", {
    font: "ANSI Shadow",
}, function (err, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
        const user_requirements = yield takeUserInput();
        user_requirements.project_name !== "." ? shell.mkdir(user_requirements.project_name) : shell.mkdir();
        shell.cd(user_requirements.project_name);
        try {
            // setup client folder
            yield setupClient(user_requirements);
            // setup necessary files at root dir
            shell.touch(["Dockerfile", "docker-compose.yml", "README.md", "LICENSE"]);
            // setup server folder
            setupServer(user_requirements.package_manager, user_requirements.ts, user_requirements.prettier);
        }
        catch (error) {
            console.log("Error Occured: ", error.message || error);
            process.exit(1);
        }
    });
});
