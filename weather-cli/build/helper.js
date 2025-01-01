var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getPublicIP() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://api.ipify.org?format=json");
        const data = yield response.json();
        return data.ip;
    });
}
export function getLocationInfo(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_IO_TOKEN}`);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            const ipGeolocationData = yield response.json();
            // console.log("GeoLocaiton Data : ", ipGeolocationData);
            return ipGeolocationData;
        }
        catch (error) {
            console.error("Error during API call:", error);
            throw new Error("API call failed");
        }
    });
}
