import Role from './role.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import {
  DELETE_K,
  STATION_ADD_BUTTON,
  STATION_DELETE_BUTTON,
  STATION_MANAGER,
  STATION_MANAGER_BUTTON,
  STATION_MANAGER_K,
  STATION_NAME_INPUT,
  STATION_NAME_TABLE,
  STATION_NAME_ROW,
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor() {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
    this.handleStationNameInput();
  }

  handleStationNameInput() {
    this.eventHandler.handleButtonEvent(
      STATION_ADD_BUTTON,
      this.addStationNameInput,
      this
    );
  }

  addStationNameInput() {
    const stationNameInput = nodeSelector.selectId(STATION_NAME_INPUT);
    const value = stationNameInput.value;
    const response = this.validator.checkStationName(value);

    response.then(isValidate =>
      isValidate
        ? this.renderStationName(value)
        : this.errorHandler.handleStationNameError(stationNameInput)
    );
  }

  renderStationName(stationName) {
    const stationNameTable = nodeSelector.selectId(STATION_NAME_TABLE);
    const row = this.getStationNameRow();
    const stationDeleteButton = document.createElement('button');

    stationDeleteButton.className = STATION_DELETE_BUTTON;
    stationDeleteButton.dataset.stationName = stationName;
    stationDeleteButton.innerHTML = DELETE_K;
    row.childNodes[0].innerHTML = stationName;
    row.childNodes[1].appendChild(stationDeleteButton);
    stationNameTable.appendChild(row);
  }

  getStationNameRow() {
    const row = document.createElement('tr');
    const nameBlank = document.createElement('td');
    const buttonBlank = document.createElement('td');

    row.appendChild(nameBlank);
    row.appendChild(buttonBlank);
    row.className = STATION_NAME_ROW;

    return row;
  }
}
