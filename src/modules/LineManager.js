import { DELETE_BUTTON } from "../constant/constant.js";
import { DELETE_CONFIRM } from "../constant/message.js";

export default class LineManager {
  constructor(station, line) {
    this._nameInput = document.querySelector("#line-name-input");
    this._addButton = document.querySelector("#line-add-button");
    this._startStationSelector = document.querySelector(
      "#line-start-station-selector"
    );
    this._endStationSelector = document.querySelector(
      "#line-end-station-selector"
    );
    this._tableBody = document.querySelector("#station-line-list tbody");
    this._station = station;
    this._line = line;

    this._render();
  }

  _createNameTd = name => {
    const nameTd = document.createElement("td");
    nameTd.textContent = name;

    return nameTd;
  };

  _createDeleteButtonTd = name => {
    const deleteButtonTd = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.classList.add("line-delete-button");
    deleteButton.dataset.name = name;
    deleteButton.textContent = DELETE_BUTTON;
    deleteButton.addEventListener("click", this._deleteLine);
    deleteButtonTd.appendChild(deleteButton);

    return deleteButtonTd;
  };

  _setTableElements = (name, list) => {
    const tr = document.createElement("tr");
    const lineNameTd = this._createNameTd(name);
    const startStationTd = this._createNameTd(list[0]);
    const endStationTd = this._createNameTd(list[list.length - 1]);
    const deleteButtonTd = this._createDeleteButtonTd(name);

    tr.appendChild(lineNameTd);
    tr.appendChild(startStationTd);
    tr.appendChild(endStationTd);
    tr.appendChild(deleteButtonTd);
    this._tableBody.appendChild(tr);
  };

  _printLineList = () => {
    const lineList = this._line.getLineList();
    this._tableBody.innerHTML = "";

    lineList.forEach(({ name, list }) => {
      this._setTableElements(name, list);
    });
  };

  _deleteLine = e => {
    const confirmDelete = confirm(DELETE_CONFIRM);

    if (!confirmDelete) {
      return;
    }

    const lineName = e.target.dataset.name;
    this._line.deleteLine(lineName);
    this._printLineList();
  };

  _handleAddButton = e => {
    e.preventDefault();
    const lineName = this._nameInput.value;
    const startStation = this._startStationSelector.value;
    const endStation = this._endStationSelector.value;
    this._nameInput.value = "";

    this._line.saveNewLine(lineName, startStation, endStation);
    this._printLineList();
  };

  _render = () => {
    this._printLineList();
    this._station.setStationOptions(this._startStationSelector);
    this._station.setStationOptions(this._endStationSelector);
    this._addButton.addEventListener("click", this._handleAddButton);
  };

  updateView = () => {
    this._station.updateStationList();
    this._line.updateLineList();
    this._printLineList();
    this._station.setStationOptions(this._startStationSelector);
    this._station.setStationOptions(this._endStationSelector);
  };
}
