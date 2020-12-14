import LineManager from './managers/lineManager.js';
import MapPrintManager from './managers/mapPrintManager.js';
import SectionManager from './managers/sectionManager.js';
import StationManager from './managers/stationManager.js';

export default class SubwayManager {
  constructor() {
    this.stations = JSON.parse(localStorage.getItem(dataStrings.DATA_STATIONS)) || [];
    this.lines = JSON.parse(localStorage.getItem(dataStrings.DATA_LINES)) || [];

    new StationManager(this.stations, this.lines);
    new LineManager(this.stations, this.lines);
    new SectionManager(this.stations, this.lines);
    new MapPrintManager(this.stations, this.lines);
  }
}

export const dataStrings = {
  DATA_STATIONS: 'stations',
  DATA_STATION: 'station',
  DATA_LINES: 'lines',
  DATA_LINE: 'line',
  DATA_TARGET: 'target',
  DATA_INDEX: 'index',
};

export const saveData = (key, data) => {
  localStorage.setItem(key, data);
};

new SubwayManager();
