import Station from "./station.js";
import { showAllStationInManager } from "./station-manager.js";
import Line from "./line.js";
import { showAllLineInLineManager } from "./line-manager.js";
import { showLineMenuInSectionManager } from "./section-manager.js";
import { showMapList } from "./map-print-manager.js";
import { manager } from "./manager.js";
import { makeStationOption, makeStationList } from "./make-selector-list.js";

const btnStationManager = document.getElementById("station-manager-button");
const btnLineManager = document.getElementById("line-manager-button");
const btnSectionManager = document.getElementById("section-manager-button");
const btnMapPrintManager = document.getElementById("map-print-manager-button");
const resultStationManager = document.getElementById("station-manager-result");
const resultSectionManager = document.getElementById("section-manager-result");
const resultLineManager = document.getElementById("line-manager-result");
const resultMapPrintManager = document.getElementById(
  "map-print-manager-result"
);
const resultList = [
  resultStationManager,
  resultLineManager,
  resultSectionManager,
  resultMapPrintManager,
];

// storage.clear();
export const initializeStationList = () => {
  const stationList = JSON.parse(storage.getItem("stationList"));
  if (stationList === null) {
    manager.stationList = [];
  } else {
    for (let i in stationList) {
      const station = new Station(stationList[i].name);
      station.next = stationList[i].next;
      station.isIncluded = stationList[i].isIncluded;
      manager.setStationInManager(station);
    }
  }
  showAllStationInManager(makeStationList());
};
export const initializeLineList = () => {
  const lineList = JSON.parse(storage.getItem("lineList"));
  if (lineList === null) {
    manager.lineList = [];
  } else {
    for (let i in lineList) {
      const line = new Line(lineList[i].name);
      line.length = lineList[i].length;
      line.head = lineList[i].head;
      manager.setLineInManager(line);
    }
  }
};
const storage = window.localStorage;
window.onload = () => {
  // 페이지 새로 열릴 때
  initializeStationList();
  initializeLineList();
};
window.onbeforeunload = () => {
  // 페이지 닫히기 전
  storage.setItem("stationList", JSON.stringify(manager.stationList));
  storage.setItem("lineList", JSON.stringify(manager.lineList));
};
const makeResultBlock = (idx) => {
  for (let i in resultList) {
    if (i === String(idx)) {
      resultList[i].style.display = "Block";
    } else {
      resultList[i].style.display = "None";
    }
  }
};
showAllStationInManager(manager.stationList);
btnStationManager.onclick = () => {
  makeResultBlock(0);
  showAllStationInManager(makeStationList());
};
btnLineManager.onclick = () => {
  makeResultBlock(1);
  makeStationOption("line-start-station-selector");
  makeStationOption("line-end-station-selector");
  showAllLineInLineManager(manager.lineList);
};
btnSectionManager.onclick = () => {
  makeResultBlock(2);
  showLineMenuInSectionManager(manager.lineList);
};
btnMapPrintManager.onclick = () => {
  makeResultBlock(3);
  showMapList();
};
