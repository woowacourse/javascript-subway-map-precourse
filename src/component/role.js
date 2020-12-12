import { nodeSelector } from '../util/selector/node_selector.js';
import {
  ACTIVE,
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
    button.innerHTML = `${index}. ${this._roleName}`;
    section.appendChild(button);
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

  renderSelectOption(value, ...selectIds) {
    for (const selectId of selectIds) {
      const selector = nodeSelector.selectId(selectId);
      const option = document.createElement('option');

      option.value = value;
      option.append(value);
      selector.append(option);
    }
  }
}
