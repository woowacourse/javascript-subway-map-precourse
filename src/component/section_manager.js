import Role from './role.js';
import { roleInterface } from './role_interface.js';
import {
  SECTION_LINE,
  SECTION_MANAGER,
  SECTION_MANAGER_BUTTON,
  SECTION_MANAGER_K,
  HIDE,
} from '../library/constant/constant.js';

export default class SectionManager extends Role {
  constructor() {
    super(SECTION_MANAGER, SECTION_MANAGER_BUTTON, SECTION_MANAGER_K);
    this.initialize();
  }

  initialize() {
    roleInterface.displayContent(SECTION_LINE, HIDE);
  }
}
