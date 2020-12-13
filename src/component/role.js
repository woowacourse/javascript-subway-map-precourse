import { nodeSelector } from '../util/selector/node_selector.js';
import {
  ACTIVE,
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

  display() {
    const role = nodeSelector.selectId(this.roleId);

    this.resetDisplay();
    role.classList.add(ACTIVE);
  }

  resetDisplay() {
    const roles = nodeSelector.selectClassAll(ROLE);

    roles.forEach(role => {
      role.classList.remove(ACTIVE);
    });
  }

  clearTable(tableId) {
    const table = nodeSelector.selectId(tableId);

    table.innerHTML = '';
  }

  clickAddButton(buttonId, onEvent, binder) {
    const addButton = nodeSelector.selectId(buttonId);

    addButton.addEventListener('click', onEvent.bind(binder));
  }

  clickDeleteButton(buttonClass, onEvent, binder) {
    const deleteButtons = nodeSelector.selectClassAll(buttonClass);

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', onEvent.bind(binder));
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
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];

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
