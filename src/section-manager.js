import { makeStationOption } from "./index.js";
import { manager } from "./manager.js";
import Station from "./station.js";

export const isPossibleDeleteIdx = () => {
  if (manager.getSelectedLine().length <= 2) {
    alert("더 이상 지하철 역을 제거 할 수 없습니다.");

    return false;
  }
  return true;
};
export const deleteSectionInList = (idx) => {
  if (isPossibleDeleteIdx()) {
    const stationInSelecteLine = document.getElementById(
      "station-in-selected-line"
    );
    stationInSelecteLine.innerHTML = "";
    manager.getSelectedLine().deleteStationInIdx(idx);
    manager.setSelectedLine(manager.selectedLine);
    showStationList(manager.getSelectedLine().getAllStationName());
  }
};
export const makeStationBox = (station, idx) => {
  const oneStation = document.createElement("tr");
  oneStation.setAttribute("id", `${idx}`);
  const stationIdx = document.createElement("td");
  const stationName = document.createElement("td");
  const deleteButton = document.createElement("td");
  stationIdx.innerHTML = idx;
  stationName.innerHTML = station;
  deleteButton.innerHTML = "삭제";
  deleteButton.setAttribute("class", "section-delete-button");
  deleteButton.onclick = () => {
    deleteSectionInList(`${idx}`);
  };

  return [stationIdx, stationName, deleteButton];
};
export const showStationList = (allStationName) => {
  const table = document.getElementById("station-in-selected-line-list-table");
  allStationName.forEach((station, idx) => {
    const stationIdx = makeStationBox(station, idx)[0];
    const stationName = makeStationBox(station, idx)[1];
    const deleteButton = makeStationBox(station, idx)[2];
    const oneStation = document.createElement("tr");
    oneStation.setAttribute("id", `${idx}`);
    oneStation.appendChild(stationIdx);
    oneStation.appendChild(stationName);
    oneStation.appendChild(deleteButton);

    table.children[1].appendChild(oneStation);
  });
};
export const onClickedLine = (lineName) => {
  const selectedLineName = lineName;
  const selectedLineBox = document.getElementById("selected-section-line");
  selectedLineBox.style.display = "Block";
  const sectionManagerTitle = document.getElementById("section-line-name");
  sectionManagerTitle.innerHTML = `${selectedLineName} 관리`;
  const stationListBox = document.getElementById("station-in-selected-line");
  stationListBox.innerHTML = ""; // 선택 노선 변경 시 역 계속 나열 안되게 초기화
  makeStationOption("section-station-selector");
  const selectedLine = manager.lineList.find(
    (line) => line.name === selectedLineName
  );
  manager.setSelectedLine(selectedLine);
  showStationList(manager.getSelectedLine().getAllStationName());
};
export const makeLineButton = (line) => {
  const lineMenuButton = document.createElement("button");
  lineMenuButton.setAttribute("class", "section-line-menu-button");
  lineMenuButton.setAttribute("id", `${line.name}`);
  lineMenuButton.onclick = () => {
    onClickedLine(`${line.name}`);
  };
  lineMenuButton.innerHTML = line.name;

  return lineMenuButton;
};
export const showLineMenuInSectionManager = (lineList) => {
  const lineMenu = document.getElementById("section-line-list");
  lineMenu.innerHTML = "";
  lineList.forEach((line) => {
    const lineMenuButton = makeLineButton(line);
    lineMenu.appendChild(lineMenuButton);
  });
};
export const isCorrectAddIdx = (idx, addSectionIdx) => {
  if (
    idx > 0 &&
    idx < manager.getSelectedLine().length &&
    !isNaN(idx) &&
    Number.isInteger(Number(idx))
  ) {
    return true;
  } else {
    alert("올바른 구간 번호를 입력하세요");
    addSectionIdx.value = "";
    makeStationOption("section-station-selector");

    return false;
  }
};
const btnAddSection = document.getElementById("section-add-button");
btnAddSection.onclick = () => {
  const addSectionIdx = document.getElementById("section-order-input");
  const inputIdx = addSectionIdx.value;
  if (isCorrectAddIdx(inputIdx, addSectionIdx)) {
    const addStationName = document.getElementById("section-station-selector")
      .value;
    const selectedLine = manager.getSelectedLine();
    const inputStation = new Station(addStationName);
    inputStation.addIncludedLine(selectedLine.name);
    manager.setStationInManager(inputStation);
    selectedLine.addStationInIdx(inputStation, addSectionIdx);

    const stationList = document.getElementById("station-in-selected-line");
    stationList.innerHTML = "";
    showStationList(manager.getSelectedLine().getAllStationName());
    addSectionIdx.value = "";
    makeStationOption("section-station-selector");
  }
};
