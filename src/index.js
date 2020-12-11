import Station from "./station.js";
import {
  addStationToList,
  isCorrectStationName,
  isOverlappedStationName,
} from "./station-manager.js";
import Line from "./line.js";
import { addLineToList, showAllLineInLineManager } from "./line-manager.js";
import { showLineMenuInSectionManager } from "./section-manager.js";
import { showMapList } from "./map-print-manager.js";

export function ManageStationLine() {
  this.lineList = [];
  this.stationList = [];
  this.selectedLine = null;
  this.addStationInList = (station) => {
    this.stationList.push(station);
  };
  this.addLineInList = (line) => {
    this.lineList.push(line);
  };
  this.getAllLineName = () => {
    let lineNameList = [];
    for (let i in lineList) {
      lineNameList.push(this.lineList[i].name);
    }

    return lineNameList;
  };
  this.setSelectedLine = (selectedLine) => {
    this.selectedLine = selectedLine;
  };
  this.getSelectedLine = () => {
    return this.selectedLine;
  };
  this.setChangedLine = (changedLine) => {
    this.lineList.forEach((line) => {
      if (line.name === changedLine.name) {
        line = changedLine;
      }
    });
  };
}
export const manager = new ManageStationLine();

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
export const makeStationOption = (stationList, optionName) => {
  const optionList = document.getElementById(optionName);
  optionList.innerHTML = ""; // 선택 노선 변경 시 지하철 역 새로 load
  for (let idx in stationList) {
    const newOption = document.createElement("option");
    newOption.innerHTML = stationList[idx].name;
    optionList.appendChild(newOption);
  }
};
btnLineManager.onclick = () => {
  makeResultBlock(1);
  console.log(manager.stationList);
  console.log(manager.lineList);
  makeStationOption(stationList, "line-start-station-selector");
  makeStationOption(stationList, "line-end-station-selector");
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
let stationList = [
  new Station("잠실"),
  new Station("혜화"),
  new Station("성신"),
  new Station("강남"),
];
for (let i in stationList) {
  manager.addStationInList(stationList[i]);
}

btnAddStation.onclick = () => {
  const newStationName = document.getElementById("station-name-input").value;
  if (
    isCorrectStationName(newStationName) === true &&
    isOverlappedStationName(newStationName) === false
  ) {
    addStationToList(newStationName);
  }
};

const tmp = new Line("2호선");
tmp.addLine(new Station("잠실"), new Station("신림"));
manager.addLineInList(tmp);
const tmp2 = new Line("3호선");
tmp2.addLine(new Station("오금"), new Station("대화"));
manager.addLineInList(tmp2);
const tmp3 = new Line("4호선");
tmp3.addLine(new Station("당고개"), new Station("오이도"));
manager.addLineInList(tmp3);

const btnAddLine = document.getElementById("line-add-button");
btnAddLine.onclick = () => {
  addLineToList();
};
