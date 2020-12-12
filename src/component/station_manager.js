import Role from './role.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import StationValidator from '../util/validator/station_validator.js';
import {
  DELETE_K,
  STATION_ADD_BUTTON,
  STATION_DELETE_BUTTON,
  STATION_MANAGER,
  STATION_MANAGER_BUTTON,
  STATION_MANAGER_K,
  STATION,
  STATION_NAME_INPUT,
  STATION_TABLE,
  STATION_ROW,
  STATIONS_LS,
  LINE_START_STATION_SELECTOR,
  LINE_END_STATION_SELECTOR,
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor(stations) {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
    this._stations = stations;
    this.renderStations();
    this.clickAddButton();
    this.clickDeleteButton();
  }

  renderStations() {
    this._stations.forEach(station => this.renderStation(station));
  }

  clickAddButton() {
    const addButton = nodeSelector.selectId(STATION_ADD_BUTTON);

    addButton.addEventListener('click', this.onClickAddButton.bind(this));
  }

  onClickAddButton() {
    const stationNameInput = nodeSelector.selectId(STATION_NAME_INPUT);
    const validator = new StationValidator();
    const response = validator.checkStationName(stationNameInput);

    if (response) {
      response.then(isValidate => {
        if (isValidate) {
          this.renderStation(stationNameInput.value);
          this.addStation(stationNameInput.value);
        }
      });
    }
  }

  addStation(station) {
    const lineStartSelect = LINE_START_STATION_SELECTOR;
    const lineEndSelect = LINE_END_STATION_SELECTOR;

    this._stations.push(station);
    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
    this.renderSelectOption(station, lineStartSelect, lineEndSelect);
  }

  renderStation(station) {
    const stationTable = nodeSelector.selectId(STATION_TABLE);
    const row = this.getStationRow();
    const stationDeleteButton = document.createElement('button');

    stationDeleteButton.className = STATION_DELETE_BUTTON;
    stationDeleteButton.dataset.station = station;
    stationDeleteButton.innerHTML = DELETE_K;
    row.childNodes[0].innerHTML = station;
    row.childNodes[1].appendChild(stationDeleteButton);
    stationTable.appendChild(row);
  }

  getStationRow() {
    const row = document.createElement('tr');
    const nameBlank = document.createElement('td');
    const buttonBlank = document.createElement('td');

    nameBlank.className = STATION;
    row.appendChild(nameBlank);
    row.appendChild(buttonBlank);
    row.className = STATION_ROW;

    return row;
  }

  clickDeleteButton() {
    const deleteButtons = nodeSelector.selectClassAll(STATION_DELETE_BUTTON);

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener(
        'click',
        this.onClickDeleteButton.bind(this)
      );
    });
  }

  onClickDeleteButton(event) {
    const target = event.target.dataset.station;
    const validator = new StationValidator();

    if (!validator.canDelete(target)) {
      return;
    }
    this.deleteStation(target);
    this.deleteStationOption(target);
  }

  deleteStation(target) {
    const stations = nodeSelector.selectClassAll(STATION);

    this._stations = this._stations.filter(station => station !== target);
    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
    for (const station of stations) {
      if (target === station.innerHTML) {
        station.parentNode.remove();

        return;
      }
    }
  }

  deleteStationOption(target) {
    const selectorIds = [
      LINE_START_STATION_SELECTOR,
      LINE_END_STATION_SELECTOR,
    ];

    for (const selectorId of selectorIds) {
      const options = nodeSelector.selectId(selectorId).childNodes;

      options.forEach(option => target === option.innerHTML && option.remove());
    }
  }
}
