"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs = __importStar(require("fs"));
const helper_1 = require("./helper");
inquirer_1.default.registerPrompt("search-list", require("inquirer-search-list"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const { language } = yield inquirer_1.default.prompt([
            {
                type: "search-list",
                name: "language",
                message: "Choose Language: ",
                choices: helper_1.languages.map((lang) => ({ name: lang, value: lang })),
            },
        ]);
        console.log("Fetching gitignore for", language, "......");
        try {
            const gitignore_lang = yield fetch(`https://www.toptal.com/developers/gitignore/api/${language}/`);
            const response = yield gitignore_lang.text();
            if (fs.existsSync(".gitignore")) {
                inquirer_1.default
                    .prompt([
                    {
                        type: "confirm",
                        name: "continue",
                        message: ".gitignore already exists do you want to overwrite or cancel:",
                        default: false,
                    },
                ])
                    .then((user_response) => {
                    if (user_response.continue) {
                        fs.writeFile(".gitignore", response, (err) => {
                            if (err)
                                throw err;
                            console.log("The file has been saved!");
                        });
                    }
                });
            }
            else {
                fs.writeFile(".gitignore", response, (err) => {
                    if (err)
                        throw err;
                    console.log("The file has been saved!");
                });
            }
        }
        catch (error) {
            console.error("Error fetching gitignore:", error);
        }
    });
})();
