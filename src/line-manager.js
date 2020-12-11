import { manager } from "./manager.js";
import Line from "./line.js";
import Station from "./station.js";

export const deleteLineInList = (lineName) => {
  const parent = document.querySelector("table#line-list-table tbody");
  const deleteIdx = manager.lineList.findIndex((line) => {
    return line.name === lineName;
  });
  manager.lineList[deleteIdx].deleteAllStationInLine();
  parent.removeChild(document.querySelector(`tbody#line-list tr#${lineName}`));
  manager.lineList.splice(deleteIdx, 1);
};
export const makeChildInLine = (line) => {
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
export const makeLineBox = (line) => {
  const lineName = makeChildInLine(line)[0];
  const startStation = makeChildInLine(line)[1];
  const endStation = makeChildInLine(line)[2];
  const deleteButton = makeChildInLine(line)[3];
  const newLine = document.createElement("tr");
  newLine.setAttribute("id", `${line.name}`);
  newLine.appendChild(lineName);
  newLine.appendChild(startStation);
  newLine.appendChild(endStation);
  newLine.appendChild(deleteButton);

  return newLine;
};
export const showAllLineInLineManager = (lineList) => {
  const table = document.getElementById("line-list");
  table.innerHTML = "";
  lineList.forEach((line) => {
    const newLine = makeLineBox(line);
    table.appendChild(newLine);
  });
  document.getElementById("line-name-input").value = "";
};
export const isPossibleLine = (startName, endName) => {
  if (startName === endName) {
    alert("상행 종점과 다른 하행 종점을 선택 해주세요.");

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
    document.getElementById("line-name-input").value = "";

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
  }
};
