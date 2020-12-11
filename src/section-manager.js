import { manager, makeStationOption } from "./index.js";

export const deleteSectionInList = (idx) => {
  const stationInSelecteLine = document.getElementById(
    "station-in-selected-line"
  );
  stationInSelecteLine.innerHTML = "";
  manager.selectedLine.deleteStationInIdx(idx, manager.getSelectedLine().name);
  manager.setSelectedLine(manager.selectedLine);
  showStationList(manager.getSelectedLine().getAllStationName());
  console.log(manager.stationList);
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
  makeStationOption(manager.stationList, "section-station-selector");
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
export const showLineList = (lineList) => {
  const lineMenu = document.getElementById("section-line-list");
  lineMenu.innerHTML = "";
  lineList.forEach((line) => {
    const lineMenuButton = makeLineButton(line);
    lineMenu.appendChild(lineMenuButton);
  });
};
const btnAddSection = document.getElementById("section-add-button");
btnAddSection.onclick = () => {
  const addSectionIdx = document.getElementById("section-order-input").value;
  const addStationName = document.getElementById("section-station-selector")
    .value;
  manager.stationList.forEach((station) => {
    if (station.name === addStationName) {
      const selectedLine = manager.getSelectedLine();
      console.log(selectedLine);
      selectedLine.addStationInIdx(station, addSectionIdx);
    }
  });
  const stationList = document.getElementById("station-in-selected-line");
  stationList.innerHTML = "";
  showStationList(manager.getSelectedLine().getAllStationName());
  console.log("등록 후stationList", manager.stationList);
};
