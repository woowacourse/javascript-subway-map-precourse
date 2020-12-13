import Station from "./manager/station.js";
import Line from "./manager/line.js";
import Section from "./manager/section.js";
import MapPrint from "./manager/mapPrint.js";
import menuEvent from "./event/menuEvent.js";

export default function SubwayMap() {
  menuEvent();
}

new SubwayMap();
