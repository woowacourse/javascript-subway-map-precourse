import { DELETE_BUTTON } from "../constant/constant.js";
import { DELETE_CONFIRM } from "../constant/message.js";

export default class StationManager {
  constructor(station) {
    this._nameInput = document.querySelector("#station-name-input");
    this._addButton = document.querySelector("#station-add-button");
    this._tableBody = document.querySelector("#station-name-list tbody");
    this._station = station;

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

    deleteButton.classList.add("station-delete-button");
    deleteButton.dataset.name = name;
    deleteButton.textContent = DELETE_BUTTON;
    deleteButton.addEventListener("click", this._deleteStation);
    deleteButtonTd.appendChild(deleteButton);

    return deleteButtonTd;
  };

  _printStationList = () => {
    const stationList = this._station.getStationList();
    this._tableBody.innerHTML = "";

    stationList.forEach(station => {
      const name = station.name;
      const tr = document.createElement("tr");
      const nameTd = this._createNameTd(name);
      const deleteButtonTd = this._createDeleteButtonTd(name);

      tr.appendChild(nameTd);
      tr.appendChild(deleteButtonTd);
      this._tableBody.appendChild(tr);
    });
  };

  _deleteStation = e => {
    const confirmDelete = confirm(DELETE_CONFIRM);

    if (!confirmDelete) {
      return;
    }

    const stationName = e.target.dataset.name;
    this._station.deleteStation(stationName);
    this._printStationList();
  };

  _handleAddButton = e => {
    e.preventDefault();
    const stationName = this._nameInput.value;
    this._nameInput.value = "";
    this._station.saveNewStation(stationName);
    this._printStationList();
  };

  _render = () => {
    this._printStationList();
    this._addButton.addEventListener("click", this._handleAddButton);
  };

  updateView = () => {
    this._printStationList();
  };
}
