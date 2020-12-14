import Role from './role.js';
import { roleInterface } from './role_interface.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import { stationValidator } from '../util/validator/station_validator.js';
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
  STATION_HEADER,
  STATION_ROW,
  STATIONS_LS,
  STATION_CONFIRM,
} from '../library/constant/constant.js';

export default class StationManager extends Role {
  constructor() {
    super(STATION_MANAGER, STATION_MANAGER_BUTTON, STATION_MANAGER_K);
    this.initialize();
    roleInterface.clickButton(STATION_ADD_BUTTON, this.onClickAddButton, this);
  }

  initialize() {
    roleInterface.clearNode(STATION_TABLE);
    this.renderStations();
    roleInterface.clickButtons(
      STATION_DELETE_BUTTON,
      this.onClickDeleteButton,
      this
    );
    roleInterface.renderSelectors();
  }

  renderStations() {
    this._stations.forEach(station => this.renderStation(station));
  }

  renderStation(station) {
    const table = nodeSelector.selectId(STATION_TABLE);
    const row = roleInterface.getRow(STATION_ROW, STATION_HEADER);
    const button = roleInterface.getButton(STATION_DELETE_BUTTON, DELETE_K);

    button.dataset.station = station;
    row.childNodes[0].className = STATION;
    row.childNodes[0].append(station);
    row.childNodes[1].append(button);
    table.append(row);
  }

  onClickAddButton() {
    const input = nodeSelector.selectId(STATION_NAME_INPUT);
    const response = stationValidator.checkValidInput(input);

    if (response) {
      response.then(isValid => {
        if (isValid) {
          this.addStation(input);
          this.initialize();
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

  onClickDeleteButton(event) {
    const target = event.target.dataset.station;

    if (!stationValidator.canDelete(target)) {
      return;
    }
    if (confirm(STATION_CONFIRM)) {
      this.deleteStation(target);
      this.initialize();
    }
  }

  deleteStation(target) {
    this._stations = this._stations.filter(station => station !== target);
    localStorage.setItem(STATIONS_LS, JSON.stringify(this._stations));
  }
}
