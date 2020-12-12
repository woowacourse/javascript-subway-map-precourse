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
    this.addStation();
  }

  renderStations() {
    this._stations.forEach(station => this.renderStation(station));
  }

  addStation() {
    const addButton = nodeSelector.selectId(STATION_ADD_BUTTON);

    addButton.addEventListener('click', this.handleStationNameInput.bind(this));
  }

  handleStationNameInput() {
    const stationNameInput = nodeSelector.selectId(STATION_NAME_INPUT);
    const validator = new StationValidator(stationNameInput);
    const response = validator.checkStationName();

    if (response) {
      response.then(isValidate => {
        if (isValidate) {
          this.renderStation(stationNameInput.value);
          this.updateStations(stationNameInput.value);
        }
      });
    }
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

  updateStations(station) {
    this._stations.push(station);

    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
  }
}
