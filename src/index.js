import Tab from "./views/Tab.js";
import stationController from "./controllers/station.js";
import lineController from "./controllers/line.js";
import sectionController from "./controllers/section.js";
import mapController from "./controllers/map.js";

new Tab("main", [stationController, lineController, sectionController, mapController]);
