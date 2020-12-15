import {SECTION, STORAGE} from '../constants.js';
import {getStations, getLines} from './subway-local-storage.js';

export default class SubwaySection {
  constructor() {
    this.stationList = getStations(STORAGE.STATION.KEY);
    this.lineList = getLines(STORAGE.LINE.KEY);
    this.lineName = '';
  }

  setCurrentLineName = (lineName) => {
    this.lineName = lineName;
  }

  addSection = (station, order, cb) => {
    if (!this.isValidOrder(order)) {
      return cb(SECTION.ALERT.NOT_LAST);
    }

    const line = this.lineList[this.lineName];

    line.splice(order, 0, {name: station});
    this.lineList[this.lineName] = line;

    return cb(null, this.lineList, this.lineName);
  }

  isValidOrder(order) {
    return this.hasValidOrder(order);
  }

  hasValidOrder(order) {
    if (isNaN(order)
      || order <= 0
      || order.length === 0
      || order >= this.lineList[this.lineName].length) {
      return false;
    };

    return true;
  }
}
