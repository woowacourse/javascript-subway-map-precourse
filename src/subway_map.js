import StationManager from './component/station_manager.js';
import LineManager from './component/line_manager.js';
import SectionManager from './component/section_manager.js';
import MapPrintManager from './component/map_print_manager.js';
import { MAP_PRINT_MANAGER } from './library/constant/constant.js';

export default class SubwayMap {
  constructor() {
    this.roles = [];
  }

  initRoles() {
    this.loadStationManager();
    this.loadLineManager();
    this.loadSectionManager();
    this.loadMapPrintManager();
  }

  loadStationManager() {
    this.roles.push(new StationManager());
  }

  loadLineManager() {
    this.roles.push(new LineManager());
  }

  loadSectionManager() {
    this.roles.push(new SectionManager());
  }

  loadMapPrintManager() {
    this.roles.push(new MapPrintManager());
  }

  activate() {
    this.roles.forEach(role => {
      role.renderRoleButton();
      role.clickRoleButton();
      role.initialize();
      role.roleId !== MAP_PRINT_MANAGER && role.clickAddButton();
    });
  }
}
