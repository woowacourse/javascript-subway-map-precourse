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
  STATION_CONFIRM,
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor() {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
    this._stations = this.getStations();
    this.initialize();
    this.clickButton(STATION_ADD_BUTTON, this.onClickAddButton, this);
  }

  initialize() {
    this.clearTable(STATION_TABLE);
    this.renderStations();
    this.clickButtons(STATION_DELETE_BUTTON, this.onClickDeleteButton, this);
  }

  renderStations() {
    this._stations.forEach(station => this.renderStation(station));
  }

  onClickAddButton() {
    const stationNameInput = nodeSelector.selectId(STATION_NAME_INPUT);
    const validator = new StationValidator();
    const response = validator.checkValidInput(stationNameInput);

    if (response) {
      response.then(isValidate => {
        if (isValidate) {
          this.addStation(stationNameInput);
          this.initialize();
          this.renderSelectors();
        }
      });
    }
  }

  addStation(input) {
    const station = input.value;

    input.value = '';
    this._stations.push(station);
    this._stations.sort();
    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
  }

  renderStation(station) {
    const stationTable = nodeSelector.selectId(STATION_TABLE);
    const row = this.getStationRow();
    const stationDeleteButton = this.getStationDeleteButton(station);

    row.childNodes[0].className = STATION;
    row.childNodes[0].append(station);
    row.childNodes[1].append(stationDeleteButton);
    stationTable.append(row);
  }

  getStationRow() {
    const row = document.createElement('tr');
    const blank = document.createElement('td');

    row.className = STATION_ROW;
    row.append(blank, blank.cloneNode(true));

    return row;
  }

  getStationDeleteButton(station) {
    const button = document.createElement('button');

    button.className = STATION_DELETE_BUTTON;
    button.dataset.station = station;
    button.append(DELETE_K);

    return button;
  }

  onClickDeleteButton(event) {
    const target = event.target.dataset.station;
    const validator = new StationValidator();

    if (!validator.canDelete(target)) {
      return;
    }
    if (confirm(STATION_CONFIRM)) {
      this.deleteStation(target);
      this.renderSelectors();
      this.initialize();
    }
  }

  deleteStation(target) {
    this._stations = this._stations.filter(station => station !== target);
    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
  }
}
