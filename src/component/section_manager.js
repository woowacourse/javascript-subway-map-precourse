import {
  SECTION_MANAGER,
  SECTION_MANAGER_BUTTON,
  SECTION_MANAGER_K,
} from '../library/constant/constant.js';
import Role from './role.js';

export default class SectionManager extends Role {
  constructor() {
    super(SECTION_MANAGER, SECTION_MANAGER_BUTTON, SECTION_MANAGER_K);
    this._lines = this.getLines();
    // this.initialize();
  }
}
