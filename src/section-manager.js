import { manager, makeStationOption } from "./index.js";

export const showStationList = (allStationName) => {
  const table = document.getElementById("station-in-selected-line-list-table");
  allStationName.forEach((station, idx) => {
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
  const targetLineName = lineName;
  const selectedLineElement = document.getElementById("selected-section-line");
  selectedLineElement.style.display = "Block";
  const sectionManagerTitle = document.getElementById("section-line-name");
  sectionManagerTitle.innerHTML = `${targetLineName} 관리`;

  makeStationOption(manager.stationList, "section-station-selector");
  manager.lineList.forEach((line) => {
    if (line.name === targetLineName) {
      manager.setSelectedLine(line);
    }
  });
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
      selectedLine.addStationToIdx(station, addSectionIdx);
    }
  });
  const stationList = document.getElementById("station-in-selected-line");
  stationList.innerHTML = "";
  showStationList(manager.getSelectedLine().getAllStationName());
};
