import Tab from "./Tab.js";
import stationView from "./views/station.js";
import lineView from './views/line.js';
import sectionView from "./views/section.js";

new Tab('main', [stationView, lineView, sectionView]);
