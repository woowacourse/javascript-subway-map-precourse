import { nodeSelector } from './util/selector/node_selector.js';
import StationManager from './component/station_manager.js';
import LineManager from './component/line_manager.js';
import SectionManager from './component/section_manager.js';
import { HIDE } from './library/constant/constant.js';

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

  activate() {
    this.roles.forEach(role => {
      const roleSection = nodeSelector.selectId(role.roleId);
      const roleButton = nodeSelector.selectId(role.buttonId);

      roleSection.classList.add(HIDE);
      roleButton.addEventListener('click', role.displayRole.bind(role));
    });
  }
}
