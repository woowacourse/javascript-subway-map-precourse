import Tab from "./Tab.js";
import stationView from "./views/station.js";
import lineView from './views/line.js';
import sectionView from "./views/section.js";
import mapView from "./views/map.js";

new Tab('main', [stationView, lineView, sectionView, mapView]);
