import HTMLManager from "./html-manager.js";
import SubwayINFOManager from "./subway-info-manager.js";

const subwayINFOManager = new SubwayINFOManager();
new HTMLManager(subwayINFOManager);
