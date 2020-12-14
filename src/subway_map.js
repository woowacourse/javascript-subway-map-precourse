import { nodeSelector } from './util/selector/node_selector.js';
import StationManager from './component/station_manager.js';
import LineManager from './component/line_manager.js';
import SectionManager from './component/section_manager.js';
import MapPrintManager from './component/map_print_manager.js';
import {
  HIDE,
  LINE_ADD_BUTTON,
  SECTION_ADD_BUTTON,
  STATION_ADD_BUTTON,
} from './library/constant/constant.js';
import { roleInterface } from './component/role_interface.js';

export default class SubwayMap {
  constructor() {
    this.roles = [];
    this.initRoles();
    this.activate();
  }

  initRoles() {
    this.loadStationManager();
    this.loadLineManager();
    this.loadSectionManager();
    this.loadMapPrintManager();
  }

  loadStationManager() {
    const stationManager = new StationManager();

    stationManager.renderRoleButton();
    roleInterface.clickButton(
      STATION_ADD_BUTTON,
      stationManager.onClickAddButton,
      stationManager
    );
    this.roles.push(stationManager);
  }

  loadLineManager() {
    const lineManager = new LineManager();

    lineManager.renderRoleButton();
    roleInterface.clickButton(
      LINE_ADD_BUTTON,
      lineManager.onClickAddButton,
      lineManager
    );
    this.roles.push(lineManager);
  }

  loadSectionManager() {
    const sectionManager = new SectionManager();

    sectionManager.renderRoleButton();
    roleInterface.clickButton(
      SECTION_ADD_BUTTON,
      sectionManager.onClickAddButton,
      sectionManager
    );
    this.roles.push(sectionManager);
  }

  loadMapPrintManager() {
    const mapPrintManager = new MapPrintManager();

    mapPrintManager.renderRoleButton();
    this.roles.push(mapPrintManager);
  }

  activate() {
    this.roles.forEach(role => {
      const roleSection = nodeSelector.selectId(role.roleId);
      const roleButton = nodeSelector.selectId(role.buttonId);

      role.initialize();
      roleSection.classList.add(HIDE);
      roleButton.addEventListener('click', role.displayRole.bind(role));
    });
  }
}
