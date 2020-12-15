import {SECTION, STORAGE} from '../constants.js';
import {getList} from './subway-local-storage.js';

export default class SubwaySection {
  constructor() {
    this.stationList = getList(STORAGE.STATION.KEY) || [];
    this.lineList = getList(STORAGE.LINE.KEY) || {};
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

  deleteSection = (targetId, cb) => {
    const line = this.lineList[this.lineName];

    if (line.length === 2) return cb(SECTION.ALERT.NOT_DELETE);

    line.splice(targetId, 1);

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
