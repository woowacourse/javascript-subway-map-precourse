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
    if (!this.isValidSection(station, order)) {
      return cb(this.alertMessage(order));
    }

    const line = this.lineList[this.lineName];

    line.splice(order, 0, {name: station});

    return cb(null, this.lineList, this.lineName);
  }

  deleteSection = (targetId, cb) => {
    const line = this.lineList[this.lineName];

    if (line.length === SECTION.MIN_LENGTH) return cb(SECTION.ALERT.NOT_DELETE);

    line.splice(targetId, 1);

    return cb(null, this.lineList, this.lineName);
  }

  isValidSection(station, order) {
    return this.hasValidOrder(order) && !this.existStation(station);
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

  existStation(station) {
    return this.lineList[this.lineName].some(currentStation =>
      currentStation.name === station,
    );
  }

  alertMessage(order) {
    if (!this.hasValidOrder(order)) return SECTION.ALERT.NOT_LAST;

    return SECTION.ALERT.DUPLICATION;
  }
}
