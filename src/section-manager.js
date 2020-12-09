import { manageStationLine, makeStationOption } from "./index.js";
export const showStationList = (selectedLine) => {
  console.log(selectedLine);
  const table = document.getElementById("station-in-selected-line-list-table");
  selectedLine.forEach((station, idx) => {
    const oneStation = document.createElement("tr");
    const stationIdx = document.createElement("td");
    const stationName = document.createElement("td");
    const deleteButton = document.createElement("td");
    stationIdx.innerHTML = idx;
    stationName.innerHTML = station;
    deleteButton.innerHTML = `<button class="select-delete-button">삭제</button>`;
    oneStation.appendChild(stationIdx);
    oneStation.appendChild(stationName);
    oneStation.appendChild(deleteButton);

    table.children[1].appendChild(oneStation);
  });
};
export const onClickedLine = (lineName) => {
  const targetLine = lineName;
  const targetLineElement = document.getElementById("section-line");
  targetLineElement.style.display = "Block";
  const sectionManagerTitle = document.getElementById("section-line-name");
  sectionManagerTitle.innerHTML = `${targetLine} 관리`;
  makeStationOption(manageStationLine.stationList, "section-station-selector");
  let selectedLine = null;
  manageStationLine.lineList.forEach((line) => {
    if (line.name === targetLine) {
      selectedLine = line;
    }
  });
  manageStationLine.setSelectedLine(selectedLine);
  console.log(selectedLine);
  showStationList(selectedLine.getAllStation());
};
export const showLineList = (lineList) => {
  console.log(lineList);
  const lineMenu = document.getElementById("section-line-list");
  lineMenu.innerHTML = "";
  lineList.forEach((line) => {
    const lineMenuButton = document.createElement("button");
    lineMenuButton.setAttribute("class", "section-line-menu-button");
    lineMenuButton.setAttribute("id", `${line.name}`);
    lineMenuButton.onclick = () => {
      onClickedLine(`${line.name}`);
    };
    lineMenuButton.innerHTML = line.name;
    lineMenu.appendChild(lineMenuButton);
  });
};
const btnAddSection = document.getElementById("section-add-button");
btnAddSection.onclick = () => {
  const addSectionIdx = document.getElementById("section-order-input").value;
  const addStationName = document.getElementById("section-station-selector")
    .value;
  console.log(manageStationLine.selectedLine);
  manageStationLine.stationList.forEach((station) => {
    if (station.name === addStationName) {
      console.log(station);
      manageStationLine.selectedLine.addStationToIdx(station, addSectionIdx);
    }
  });
  const stationList = document.getElementById("station-in-selected-line");
  stationList.innerHTML = "";
  showStationList(manageStationLine.selectedLine.getAllStation());
  console.log(manageStationLine.selectedLine);
};
