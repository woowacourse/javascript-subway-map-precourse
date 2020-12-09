import Station from "./station.js";
import { addStationtoList } from "./station-manager.js";

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
const makeResultBlock = (idx) => {
  for (let i in resultList) {
    if (i == idx) {
      resultList[i].style.display = "Block";
    } else {
      resultList[i].style.display = "None";
    }
  }
};
btnStationManager.onclick = () => {
  makeResultBlock(0);
};
btnLineManager.onclick = () => {
  makeResultBlock(1);
};
btnSectionManager.onclick = () => {
  makeResultBlock(2);
};
btnMapPrintManager.onclick = () => {
  makeResultBlock(3);
};
const btnAddStation = document.getElementById("station-add-button");
let stationList = [];
btnAddStation.onclick = () => {
  const newStationName = document.getElementById("station-name-input").value;
  const station = new Station(newStationName);
  stationList.push(station);
  addStationtoList(newStationName);
  console.log(stationList);
};
