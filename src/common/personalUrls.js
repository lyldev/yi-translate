import browserInfo from "browser-info";

const browserName = browserInfo().name;
const suffix = browserName === "Chrome" ? "fc" : "";
export const email = `xxx.firefox+st${suffix}@gmail.com`;
export const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&no_shipping=1&business=sienori.firefox@gmail.com&item_name=Yi Translate for ${browserName} - Donation`;
export const patreonLink = "https://www.patreon.com/xxx";
export const chromeExtensionUrl = `https://chrome.google.com/webstore/detail/notavailablenow`;
export const firefoxAddonUrl = `https://addons.mozilla.org/firefox/addon/yi-translate/`;
