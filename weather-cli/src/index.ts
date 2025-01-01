import { getPublicIP, getLocationInfo, GeoLocationData } from "./helper.js";
import * as cheerio from 'cheerio';

(async () => {
  try {
    const ip:string = await getPublicIP();
    // console.log("Your Public IP:", ip);

    const response:GeoLocationData = await getLocationInfo(ip);
    // console.log(`Coordinates: ${response.loc}`);
    
    const WeatherReport = await fetch(`https://wttr.in/${response.city}`).then(res => res.text());
    console.log(cheerio.load(WeatherReport)('body').text().replace(/(Follow @igor_chubin|wttr\.in|pyphoon|wego)/g, '').trim())
  } catch (error) {
    console.error("Error:", error);
  }
})();
