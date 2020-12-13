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
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor(stations) {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
    this._stations = stations;
    this.renderStations();
    this.clickAddButton();
  }

  renderStations() {
    this.clearStationTable();
    this._stations.forEach(station => this.renderStation(station));
    this.clickDeleteButton();
  }

  clearStationTable() {
    const table = nodeSelector.selectId(STATION_TABLE);

    table.innerHTML = '';
  }

  clickAddButton() {
    const addButton = nodeSelector.selectId(STATION_ADD_BUTTON);

    addButton.addEventListener('click', this.onClickAddButton.bind(this));
  }

  onClickAddButton() {
    const stationNameInput = nodeSelector.selectId(STATION_NAME_INPUT);
    const validator = new StationValidator();
    const response = validator.checkValidInput(stationNameInput);

    if (response) {
      response.then(isValidate => {
        if (isValidate) {
          this.addStation(stationNameInput);
          this.renderStations();
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
    this.renderSelectors();
    this.renderStations();
  }

  deleteStation(target) {
    this._stations = this._stations.filter(station => station !== target);
    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
  }
}
