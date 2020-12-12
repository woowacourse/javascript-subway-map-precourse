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
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor() {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
    this.addStationName();
  }

  addStationName() {
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
          this.renderStationName(stationNameInput.value);
          // 로컬 스토리지에 추가하는 로직.
        }
      });
    }
  }

  renderStationName(stationName) {
    const stationNameTable = nodeSelector.selectId(STATION_TABLE);
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

    nameBlank.className = STATION;
    row.appendChild(nameBlank);
    row.appendChild(buttonBlank);
    row.className = STATION_ROW;

    return row;
  }
}
