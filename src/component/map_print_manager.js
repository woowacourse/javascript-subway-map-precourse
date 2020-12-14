import Role from './role.js';
import { roleInterface } from './role_interface.js';
import {
  MAP_PRINT_MANAGER,
  MAP_PRINT_MANAGER_BUTTON,
  MAP_PRINT_MANAGER_K,
} from '../library/constant/constant.js';

export default class MapPrintManager extends Role {
  constructor() {
    super(MAP_PRINT_MANAGER, MAP_PRINT_MANAGER_BUTTON, MAP_PRINT_MANAGER_K);
    this.initialize();
  }

  initialize() {
    roleInterface.printMap();
  }
}
