import Component from './factory/Component.js';
import LineManager from './managers/lineManager.js';
import MapPrintManager from './managers/MapPrintManager.js';
import SectionManager from './managers/SectionManager.js';
import StationManager from './managers/StationManager.js';
import { LINE, MAP, MENU, SECTION, STATION } from './share/selector.js';

export default class SubwayManager {
  constructor() {
    this.menu = document.querySelector(`#${MENU.MENU_CONTAINER_ID}`);
    console.log(this.menu);

    this.stationManager = new StationManager({
      managerId: MENU.STATION_MANGER_BUTTON_ID,
      containerId: STATION.STATION_MANAGER_CONTAINER_ID,
    });
    this.lineManager = new LineManager({
      managerId: MENU.LINE_MANAGER_BUTTON_ID,
      containerId: LINE.LINE_MANAGER_CONTAINER_ID,
    });
    this.sectionManager = new SectionManager({
      managerId: MENU.SECTION_MANAGER_BUTTON_ID,
      containerId: SECTION.SECTION_MANAGER_CONTAINER_ID,
    });
    this.mapPrintManager = new MapPrintManager({
      managerId: MENU.MAP_PRINT_MANAGER_BUTTON_ID,
      containerId: MAP.MAP_PRINT_MANAGER_CONTAINER_ID,
    });

    this.currentManager = this.stationManager;

    this.menu.addEventListener('click', this.changeMenu);
  }

  changeMenu = (e) => {
    const { nodeName } = e.target;
    const { id } = e.target;
    if (nodeName !== 'BUTTON') return;
    [
      this.stationManager,
      this.lineManager,
      this.sectionManager,
      this.mapPrintManager,
    ].forEach((manager) => {
      manager.managerId === id ? manager.show() : manager.hide();
    });
  };
}

new SubwayManager();
