import Component from '../factory/Component.js';
import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';
import MapPrintManager from './MapPrintManager.js';
import {
  MENU,
  STATION_SELECTOR,
  LINE_SELECTOR,
  SECTION_SELECTOR,
  MAP_SELECTOR,
} from '../share/selector.js';
import storage, { STORAGE_KEY } from '../share/storage.js';

export default class SubwayManager extends Component {
  constructor() {
    super();
    this.data = storage.getItem(STORAGE_KEY);
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
  }

  init() {
    this.syncData(this.data);
    this.menu.addEventListener('click', this.changeMenu);
  }

  changeMenu = (event) => {
    const { nodeName } = event.target;
    const { id } = event.target;
    if (nodeName !== 'BUTTON') return;
    this.getManager(id);
  };

  getManager(id) {
    const managerList = [
      this.stationManager,
      this.lineManager,
      this.sectionManager,
      this.mapPrintManager,
    ];
    managerList.forEach((manager) => {
      manager.managerId === id ? manager.show() : manager.hide();
      manager.managerId === MENU.SECTION_MANAGER_BUTTON_ID
        ? this.sectionManager.sectionDetailManager.hide()
        : '';
    });
  }

  syncData = (data) => {
    storage.setItem(STORAGE_KEY, data);
    this.setData(data);
    this.stationManager.setData(data);
    this.lineManager.setData(data);
    this.sectionManager.setData(data);
    this.sectionManager.sectionDetailManager.setData(data);
    this.mapPrintManager.setData(data);
  };
}
