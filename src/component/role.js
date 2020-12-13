import { nodeSelector } from '../util/selector/node_selector.js';
import {
  ACTIVE,
  LINE_END_STATION_SELECTOR,
  LINE_START_STATION_SELECTOR,
  ROLE,
  ROLE_BUTTON_SECTION,
  ROLE_NAMES,
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

  renderStationOptions(stations) {
    const selectorIds = [
      LINE_START_STATION_SELECTOR,
      LINE_END_STATION_SELECTOR,
    ];

    selectorIds.forEach(selectorId => {
      const selector = nodeSelector.selectId(selectorId);

      selector.innerHTML = '';
      this.renderSelectOptions(selector, stations);
    });
  }

  renderSelectOptions(selector, values) {
    for (const value of values) {
      const option = document.createElement('option');

      option.value = value;
      option.append(value);
      selector.append(option);
    }
  }
}
