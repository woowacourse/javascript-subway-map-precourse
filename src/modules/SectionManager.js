import Station from "./Station.js";
import Line from "./Line.js";
import { DELETE_FROM_LINE_BUTTON } from "../constant/constant.js";

export default class SectionManager {
  constructor() {
    this._lineMenuList = document.querySelector("#line-menu-button-group");
    this._stationSelector = document.querySelector("#section-station-selector");
    this._addSectionContainer = document.querySelector(
      "#add-section-container"
    );
    this._tableBody = document.querySelector("#line-section-list tbody");
    this._selectedLineName = "";
    this._station = new Station();
    this._line = new Line();

    this._render();
  }

  _createLineMenu = name => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = name;
    button.classList.add("section-line-menu-button");
    button.addEventListener("click", this._handleSectionLineMenuButton);

    li.appendChild(button);
    this._lineMenuList.appendChild(li);
  };

  _createNameTd = name => {
    const nameTd = document.createElement("td");
    nameTd.textContent = name;

    return nameTd;
  };

  _createDeleteButtonTd = name => {
    const deleteButtonTd = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.classList.add("section-delete-button");
    deleteButton.dataset.name = name;
    deleteButton.textContent = DELETE_FROM_LINE_BUTTON;
    deleteButton.addEventListener("click", this._deleteStation);
    deleteButtonTd.appendChild(deleteButton);

    return deleteButtonTd;
  };

  _setTableElements = (lineName, index) => {
    const tr = document.createElement("tr");
    const indexTd = this._createNameTd(index);
    const lineNameTd = this._createNameTd(lineName);
    const deleteButtonTd = this._createDeleteButtonTd(lineName);

    tr.appendChild(indexTd);
    tr.appendChild(lineNameTd);
    tr.appendChild(deleteButtonTd);
    this._tableBody.appendChild(tr);
  };

  _deleteStation = e => {
    const stationName = e.target.dataset.name;
    this._line.deleteStationFromLine(stationName, this._selectedLineName);
  };

  _printLineMenuList = () => {
    const lineList = this._line.getLineList();
    this._lineMenuList.innerHTML = "";

    lineList.forEach(line => {
      this._createLineMenu(line.name);
    });
  };

  _printSectionList = lineName => {
    const lineList = this._line.getLineList();
    const selectedLine = lineList.filter(line => line.name === lineName)[0];

    this._tableBody.innerHTML = "";
    selectedLine.list.forEach((line, index) => {
      this._setTableElements(line, index);
    });
  };

  _handleSectionLineMenuButton = e => {
    const selectedLineName = this._addSectionContainer.querySelector(
      ".station-line-name"
    );
    const lineName = e.target.innerText;
    this._selectedLineName = lineName;

    this._addSectionContainer.classList.add("active");
    selectedLineName.textContent = `${lineName} 관리`;
    this._printSectionList(lineName);
  };

  _render = () => {
    this._printLineMenuList();
    this._station.setStationOptions(this._stationSelector);
  };
}
