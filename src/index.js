import Station from "./manager/station.js";
import Line from "./manager/line.js";
import Section from "./manager/section.js";
import MapPrint from "./manager/mapPrint.js";

export default function SubwayMap() {
  const station = new Station();
  const line = new Line();
  const section = new Section();
  const mapPrint = new MapPrint();
  const stationBtn = document.getElementById("station-manager-button");
  const lineBtn = document.getElementById("line-manager-button");
  const sectionBtn = document.getElementById("section-manager-button");
  const mapPrintBtn = document.getElementById("map-print-manager-button");

  this.onClickStation = () => {
    station.init(line.lines);
  };

  this.onClickLine = () => {
    line.init();
  };

  this.onClickSection = () => {};

  this.onClickMapPrint = () => {};

  stationBtn.addEventListener("click", this.onClickStation);
  lineBtn.addEventListener("click", this.onClickLine);
  sectionBtn.addEventListener("click", this.onClickSection);
  mapPrintBtn.addEventListener("click", this.onClickMapPrint);
}

new SubwayMap();
