import { nodeSelector } from '../util/selector/node_selector.js';
import {
  HIDE,
  LINES_LS,
  NONE_K,
  ROLE,
  ROLE_BUTTON_SECTION,
  ROLE_NAMES,
  SELECTORS,
  STATIONS_LS,
} from '../library/constant/constant.js';

export default class Role {
  constructor(roleId, buttonId, roleName) {
    this.roleId = roleId;
    this.buttonId = buttonId;
    this._roleName = roleName;
    this.renderRoleButton();
  }

  getStations() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];

    return stations;
  }

  getSections() {
    const loadedLines = localStorage.getItem(LINES_LS);
    const lines = loadedLines ? JSON.parse(loadedLines) : [];

    return lines;
  }

  renderRoleButton() {
    const section = nodeSelector.selectClass(ROLE_BUTTON_SECTION);
    const button = document.createElement('button');
    const index = this.getIndex();

    button.id = this.buttonId;
    button.append(`${index}. ${this._roleName}`);
    section.append(button);
  }

  getIndex() {
    return ROLE_NAMES.indexOf(this._roleName);
  }

  displayRole() {
    const role = nodeSelector.selectId(this.roleId);

    this.hideRoles();
    role.classList.remove(HIDE);
  }

  hideRoles() {
    const roles = nodeSelector.selectClassAll(ROLE);

    roles.forEach(role => {
      role.classList.add(HIDE);
    });
  }

  clearTable(tableId) {
    const table = nodeSelector.selectId(tableId);

    table.innerHTML = '';
  }

  clickButton(buttonId, onEvent, binder) {
    const button = nodeSelector.selectId(buttonId);

    button.addEventListener('click', onEvent.bind(binder));
  }

  clickButtons(buttonClass, onEvent, binder) {
    const buttons = nodeSelector.selectClassAll(buttonClass);

    buttons.forEach(button => {
      button.addEventListener('click', onEvent.bind(binder));
    });
  }

  renderSelectors() {
    SELECTORS.forEach(selectorId => {
      const selector = nodeSelector.selectId(selectorId);

      selector.innerHTML = '';
      this.renderSelectOptions(selector);
    });
  }

  renderSelectOptions(selector) {
    const stations = this.getStations();

    if (stations.length === 0) {
      this.renderSelectOption(selector, NONE_K);

      return;
    }
    for (const station of stations) {
      this.renderSelectOption(selector, station);
    }
  }

  renderSelectOption(selector, value) {
    const option = document.createElement('option');

    option.value = value;
    option.append(value);
    selector.append(option);
  }
}
