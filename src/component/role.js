import { nodeSelector } from '../util/selector/node_selector.js';
import Validator from '../util/validator/validator.js';
import EventHandler from '../util/handler/event_handler/event_handler.js';
import {
  ROLE,
  ROLE_BUTTON_SECTION,
  ROLE_NAMES,
} from '../library/constant/constant.js';

export default class Role {
  constructor(roleId, buttonId, roleName) {
    this.roleId = roleId;
    this.buttonId = buttonId;
    this._roleName = roleName;
    this.validator = new Validator();
    this.eventHandler = new EventHandler();
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
    role.classList.add('active');
  }

  resetDisplay() {
    const roles = nodeSelector.selectClassAll(ROLE);

    roles.forEach(role => {
      role.classList.remove('active');
    });
  }
}
