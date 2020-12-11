import Station from "./station.js";
import {
  addStationToList,
  isCorrectStationName,
  isOverlappedStationName,
  showAllStationInManager,
} from "./station-manager.js";
import Line from "./line.js";
import { addLineToList, showAllLineInLineManager } from "./line-manager.js";
import { showLineMenuInSectionManager } from "./section-manager.js";
import { showMapList } from "./map-print-manager.js";
import { manager } from "./manager.js";

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

const tmp = new Line("2호선");
const tmp2 = new Station("잠실");
const tmp3 = new Station("신림");
tmp.addLine(tmp2, tmp3);
manager.setStationInManager(tmp2);
manager.setStationInManager(tmp3);
manager.setLineInManager(tmp);
const tmp4 = new Line("3호선");
const tmp5 = new Station("대화");
const tmp6 = new Station("오금");
tmp4.addLine(tmp5, tmp6);
manager.setStationInManager(tmp5);
manager.setStationInManager(tmp6);
manager.setLineInManager(tmp4);

const makeResultBlock = (idx) => {
  for (let i in resultList) {
    if (i == idx) {
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
export const makeStationList = () => {
  const finalStationList = [];
  const nowStationList = manager.stationList;
  const stationName = [];
  nowStationList.forEach((station) => {
    stationName.push(station.name);
  });
  const stationNameSet = Array.from(new Set(stationName));
  stationNameSet.forEach((name) => {
    const sameName = nowStationList.filter(
      (station) => station.name === name && station.isIncluded !== null
    );
    if (sameName.length === 0) {
      finalStationList.push(
        nowStationList.filter(
          (station) => station.name === name && station.isIncluded === null
        )[0]
      );
    } else {
      finalStationList.push(sameName[0]);
    }
  });
  return finalStationList;
};
export const makeStationOption = (optionStationList, optionName) => {
  const optionList = document.getElementById(optionName);
  optionList.innerHTML = ""; // 선택 노선 변경 시 지하철 역 새로 load
  console.log(optionStationList);
  for (let idx in optionStationList) {
    const newOption = document.createElement("option");
    newOption.innerHTML = optionStationList[idx].name;
    optionList.appendChild(newOption);
  }
};
btnLineManager.onclick = () => {
  makeResultBlock(1);
  const optionStationList = makeStationList();
  makeStationOption(optionStationList, "line-start-station-selector");
  makeStationOption(optionStationList, "line-end-station-selector");
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
const btnAddStation = document.getElementById("station-add-button");
btnAddStation.onclick = () => {
  const newStationName = document.getElementById("station-name-input").value;
  if (
    isCorrectStationName(newStationName) &&
    !isOverlappedStationName(newStationName)
  ) {
    addStationToList(newStationName);
  }
};
const btnAddLine = document.getElementById("line-add-button");
btnAddLine.onclick = () => {
  addLineToList();
};
