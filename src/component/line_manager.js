import Role from './role.js';
// import { nodeSelector } from '../util/selector/node_selector.js';
import {
  LINE_MANAGER,
  LINE_MANAGER_BUTTON,
  LINE_MANAGER_K,
} from '../library/constant/constant.js';

export default class LineManager extends Role {
  constructor(lines) {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
    this._lines = lines;
  }
}
