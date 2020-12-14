import Component from './factory/Component.js';
import LineManager from './managers/LineManager.js';
import MapPrintManager from './managers/MapPrintManager.js';
import SectionManager from './managers/SectionManager.js';
import StationManager from './managers/StationManager.js';
import {
  MENU,
  STATION_SELECTOR,
  LINE_SELECTOR,
  SECTION_SELECTOR,
  MAP_SELECTOR,
} from './share/selector.js';
import storage from './share/storage.js';

const STORAGE_KEY = 'state';
export default class SubwayManager extends Component {
  constructor() {
    super();
    this.state = storage.getItem(STORAGE_KEY);
    this.menu = document.querySelector(`#${MENU.MENU_CONTAINER_ID}`);

    this.stationManager = new StationManager({
      managerId: MENU.STATION_MANGER_BUTTON_ID,
      containerId: STATION_SELECTOR.MANAGER_CONTAINER_ID,
      syncData: this.syncData,
    });
    this.lineManager = new LineManager({
      managerId: MENU.LINE_MANAGER_BUTTON_ID,
      containerId: LINE_SELECTOR.MANAGER_CONTAINER_ID,
      syncData: this.syncData,
    });
    this.sectionManager = new SectionManager({
      managerId: MENU.SECTION_MANAGER_BUTTON_ID,
      containerId: SECTION_SELECTOR.MANAGER_CONTAINER_ID,
      syncData: this.syncData,
    });
    this.mapPrintManager = new MapPrintManager({
      managerId: MENU.MAP_PRINT_MANAGER_BUTTON_ID,
      containerId: MAP_SELECTOR.PRINT_MANAGER_CONTAINER_ID,
      syncData: this.syncData,
    });

    this.menu.addEventListener('click', this.changeMenu);

    this.syncData(this.state);
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

  syncData = (data) => {
    storage.setItem(STORAGE_KEY, data);
    this.setState(data);
    this.stationManager.setState(data);
    this.lineManager.setState(data);
    this.sectionManager.setState(data);
    this.sectionManager.sectionDetailManager.setState(data);
    this.mapPrintManager.setState(data);
  };
}

new SubwayManager();
