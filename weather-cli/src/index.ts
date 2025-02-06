#!/usr/bin/env node

import { getPublicIP, getLocationInfo, GeoLocationData } from "./helper.js";
import * as cheerio from 'cheerio';
import ora from 'ora';

(async () => {
  try {
    const ip: string = await getPublicIP();

    const spinner = ora("Fetching weather data...").start();
    try {
      const response: GeoLocationData = await getLocationInfo(ip);
      const WeatherReport = await fetch(`https://wttr.in/${response.city}`).then(res => res.text());
      spinner.stop();
      
      console.log(cheerio.load(WeatherReport)('body').text().replace(/(Follow @igor_chubin|wttr\.in|pyphoon|wego)/g, '').trim())
    } catch (error) {
      spinner.stop();
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
})();
