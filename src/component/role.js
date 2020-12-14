import { nodeSelector } from '../util/selector/node_selector.js';
import {
  ACTIVE,
  HIDE,
  ROLE,
  ROLE_BUTTON_SECTION,
  ROLE_NAMES,
  SECTION_LINE,
} from '../library/constant/constant.js';
import { roleInterface } from './role_interface.js';

export default class Role {
  constructor(roleId, buttonId, roleName) {
    this.roleId = roleId;
    this.buttonId = buttonId;
    this._roleName = roleName;
    this._stations = roleInterface.getStations();
    this._lineInfos = roleInterface.getLineInfos();
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
    roleInterface.displayContents(ROLE, HIDE);
    roleInterface.displayContent(SECTION_LINE, HIDE);
    roleInterface.displayContent(this.roleId, ACTIVE);
  }
}
