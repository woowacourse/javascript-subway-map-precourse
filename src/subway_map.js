import { nodeSelector } from './util/selector/node_selector.js';
import StationManager from './component/station_manager.js';
import LineManager from './component/line_manager.js';
import { LINES_LS, STATIONS_LS } from './library/constant/constant.js';

export default class SubwayMap {
  constructor() {
    this.roles = [];
    this.initRoles();
    this.activate();
  }

  initRoles() {
    this.loadStationManager();
    this.loadLineManager();
  }

  loadStationManager() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];

    this.roles.push(new StationManager(stations));
  }

  loadLineManager() {
    const loadedLines = localStorage.getItem(LINES_LS);
    const lines = loadedLines ? JSON.parse(loadedLines) : [];

    this.roles.push(new LineManager(lines));
  }

  activate() {
    this.roles.forEach(role => {
      const roleButton = nodeSelector.selectId(role.buttonId);

      roleButton.addEventListener('click', role.display.bind(role));
    });
  }
}
