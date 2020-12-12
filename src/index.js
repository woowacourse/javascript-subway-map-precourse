import HTMLManager from "./html-manager.js";
import StationINFOManager from "./station-info-manager.js";

const BODY_ID = "app";

const stationINFOManager = new StationINFOManager();

new HTMLManager(stationINFOManager);
