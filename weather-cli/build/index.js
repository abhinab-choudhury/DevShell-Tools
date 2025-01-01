var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPublicIP, getLocationInfo } from "./helper.js";
import * as cheerio from 'cheerio';
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ip = yield getPublicIP();
        // console.log("Your Public IP:", ip);
        const response = yield getLocationInfo(ip);
        // console.log(`Coordinates: ${response.loc}`);
        const WeatherReport = yield fetch(`https://wttr.in/${response.city}`).then(res => res.text());
        console.log(cheerio.load(WeatherReport)('body').text().replace(/(Follow @igor_chubin|wttr\.in|pyphoon|wego)/g, '').trim());
    }
    catch (error) {
        console.error("Error:", error);
    }
}))();
