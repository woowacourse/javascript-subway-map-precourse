import { makeStationOption } from "./make-selector-list.js";
import { manager } from "./manager.js";
import Line from "./line.js";
import Station from "./station.js";

export const deleteLineInList = (lineName) => {
  const parent = document.querySelector("tbody#line-list");
  const deleteIdx = manager.lineList.findIndex((line) => {
    return line.name === lineName;
  });
  parent.removeChild(document.getElementById(`${lineName}-line`));
  manager.lineList[deleteIdx].deleteAllStationInLine();
  manager.lineList.splice(deleteIdx, 1);
};
export const makeLineChildUI = (line) => {
  const lineName = document.createElement("td");
  const startStation = document.createElement("td");
  const endStation = document.createElement("td");
  const deleteButton = document.createElement("td");
  lineName.innerHTML = line.name;
  startStation.innerHTML = line.getStartStation();
  endStation.innerHTML = line.getEndStation();
  deleteButton.innerHTML = "삭제";
  deleteButton.setAttribute("class", "line-delete-button");
  deleteButton.onclick = () => {
    deleteLineInList(`${line.name}`);
  };
  deleteButton.innerHTML = "삭제";

  return [lineName, startStation, endStation, deleteButton];
};
export const makeLineUI = (line) => {
  const [lineName, startStation, endStation, deleteButton] = makeLineChildUI(
    line
  );
  const newLine = document.createElement("tr");
  newLine.setAttribute("id", `${line.name}-line`);
  newLine.append(lineName, startStation, endStation, deleteButton);

  return newLine;
};
export const showAllLineInLineManager = (lineList) => {
  const table = document.getElementById("line-list");
  table.innerHTML = "";
  lineList.forEach((line) => {
    const newLine = makeLineUI(line);
    table.appendChild(newLine);
  });
  document.getElementById("line-name-input").value = "";
};
export const isPossibleLineName = (name) => {
  const rHangel = /^[0-9A-Za-z가-힣]*$/;
  if (name.length > 0 && rHangel.exec(name) !== null) {
    return true;
  }
  alert("올바른 노선 이름을 입력 해주세요");

  return false;
};
export const resetLineInput = () => {
  document.getElementById("line-name-input").value = "";
  makeStationOption("line-start-station-selector");
  makeStationOption("line-end-station-selector");
};
export const isPossibleLine = (startName, endName) => {
  if (startName === endName) {
    alert("상행 종점과 다른 하행 종점을 선택 해주세요.");
    resetLineInput();

    return false;
  }
  return true;
};
export const isOverlappedLineName = (newLineName) => {
  const overlappedName = manager.lineList.find(
    (line) => line.name === newLineName
  );
  if (overlappedName) {
    alert("이미 등록된 노선입니다.");
    resetLineInput();

    return true;
  }
  return false;
};
export const addLineToList = () => {
  const newLineName = document.getElementById("line-name-input").value;
  const startStationName = document.getElementById(
    "line-start-station-selector"
  ).value;
  const endStationName = document.getElementById("line-end-station-selector")
    .value;
  if (
    isPossibleLineName(newLineName) &&
    isPossibleLine(startStationName, endStationName) &&
    !isOverlappedLineName(newLineName)
  ) {
    const line = new Line(newLineName);
    const startStation = new Station(startStationName);
    const endStation = new Station(endStationName);
    manager.setStationInManager(startStation);
    manager.setStationInManager(endStation);
    line.addLine(startStation, endStation);
    manager.setLineInManager(line);
    showAllLineInLineManager(manager.lineList);
    resetLineInput();
  }
};

const btnAddLine = document.getElementById("line-add-button");
btnAddLine.onclick = () => {
  addLineToList();
};
