import LineManager from './managers/lineManager.js';
import MapPrintManager from './managers/mapPrintManager.js';
import SectionManager from './managers/sectionManager.js';
import StationManager from './managers/stationManager.js';
import { dataStrings } from './doms.js';

export default class SubwayManager {
  constructor() {
    this.stations = loadData(dataStrings.DATA_STATIONS) || [];
    this.lines = loadData(dataStrings.DATA_LINES) || [];

    new StationManager(this.stations, this.lines);
    new LineManager(this.stations, this.lines);
    new SectionManager(this.stations, this.lines);
    new MapPrintManager(this.stations, this.lines);
  }
}

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadData = key => {
  return JSON.parse(localStorage.getItem(key));
};

new SubwayManager();
