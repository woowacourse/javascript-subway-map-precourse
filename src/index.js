import Station from "./station.js";
import { addStationToList, isCorrectStationName } from "./station-manager.js";
import Line from "./line.js";
import { addLineToList } from "./line-manager.js";
import { showLineList } from "./section-manager.js";

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
const setStationList = (stationList) => {
  const startOptions = document.getElementById("line-start-station-selector");
  const endOptions = document.getElementById("line-end-station-selector");
  for (let idx in stationList) {
    const newOption = document.createElement("option");
    newOption.innerHTML = stationList[idx].name;
    const copyOption = newOption.cloneNode(true);
    startOptions.appendChild(newOption);
    endOptions.appendChild(copyOption);
  }
};
btnLineManager.onclick = () => {
  makeResultBlock(1);
  setStationList(stationList);
};
btnSectionManager.onclick = () => {
  makeResultBlock(2);
  showLineList(lineList);
};
btnMapPrintManager.onclick = () => {
  makeResultBlock(3);
};
const btnAddStation = document.getElementById("station-add-button");
let stationList = [
  new Station("길음"),
  new Station("혜화"),
  new Station("성신"),
];
btnAddStation.onclick = () => {
  const newStationName = document.getElementById("station-name-input").value;
  if (isCorrectStationName(newStationName)) {
    const station = new Station(newStationName);
    stationList.push(station);
    addStationToList(newStationName);
  }
};

const btnAddLine = document.getElementById("line-add-button");
let lineList = [];
for (let i = 0; i < 5; i++) {
  const tmp = new Line(`${i}호선`);
  tmp.addLine(new Station("오금"), new Station("길음"));
  lineList.push(tmp);
}
btnAddLine.onclick = () => {
  const newLineName = document.getElementById("line-name-input").value;
  const startStation = document.getElementById("line-start-station-selector")
    .value;
  const endStation = document.getElementById("line-end-station-selector").value;
  const line = new Line(newLineName);
  line.addLine(new Station(startStation), new Station(endStation));
  lineList.push(line);
  addLineToList(line);
  console.log(lineList);
};
