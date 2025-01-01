export interface GeoLocationData {
  ip: string; // IP address as a string
  hostname: string; // Hostname as a string
  city: string; // City name
  region: string; // Region (e.g., state or province)
  country: string; // Country code (e.g., "US")
  loc: string; // Location in "latitude,longitude" format
  org: string; // Organization (e.g., ISP or network provider)
  postal: string; // Postal code
  timezone: string; // Timezone (e.g., "America/New_York")
}

export async function getPublicIP(): Promise<string> {
  const response = await fetch("https://api.ipify.org?format=json");
  const data: { ip: string } = await response.json();
  return data.ip;
}

export async function getLocationInfo(ip: string): Promise<GeoLocationData> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_IO_TOKEN}`);

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    
    const ipGeolocationData: GeoLocationData = await response.json();
    // console.log("GeoLocaiton Data : ", ipGeolocationData);

    return ipGeolocationData;
  } catch (error) {
    console.error("Error during API call:", error);
    throw new Error("API call failed");
  }
}
