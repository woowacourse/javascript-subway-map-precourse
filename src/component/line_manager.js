import Role from './role.js';
import {
  LINE_MANAGER,
  LINE_MANAGER_BUTTON,
  LINE_MANAGER_K,
  STATIONS_LS,
  NONE_K,
  LINE_START_STATION_SELECTOR,
  LINE_END_STATION_SELECTOR,
} from '../library/constant/constant.js';

export default class LineManager extends Role {
  constructor(lines) {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
    this._lines = lines;
    this.initSelectOptions();
  }

  initSelectOptions() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];
    const lineStartSelect = LINE_START_STATION_SELECTOR;
    const lineEndSelect = LINE_END_STATION_SELECTOR;

    if (stations.length == 0) {
      this.renderSelectOption(NONE_K, lineStartSelect, lineEndSelect);

      return;
    }
    stations.forEach(station => {
      this.renderSelectOption(station, lineStartSelect, lineEndSelect);
    });
  }
}
