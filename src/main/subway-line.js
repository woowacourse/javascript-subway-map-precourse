import {LINE, STORAGE} from '../constants.js';
import {getList} from './subway-local-storage.js';
import {lineModel} from '../model/subway-model.js';

export default class SubwayLine {
  constructor() {
    this.stationList = getList(STORAGE.STATION.KEY) || [];
    this.lineList = getList(STORAGE.LINE.KEY) || {};
  }

  addLine = (lineName, start, end, cb) => {
    if (!this.isValidLine(lineName, start, end)) {
      return cb(this.alertMessage(lineName, start, end));
    }

    this.lineList = Object.assign(
        {}, this.lineList, lineModel(lineName, start, end),
    );

    return cb(null, this.lineList);
  }

  deleteLine = (lineName, cb) => {
    const {[lineName]: [], ...withoutDeletedLine} = this.lineList;

    this.lineList = withoutDeletedLine;

    return cb(this.lineList);
  }

  isValidLine(lineName, start, end) {
    return this.hasValidName(lineName, start, end);
  }

  hasValidName(lineName, start, end) {
    if (start === end) return false;
    if (this.lineList[lineName]) return false;
    if (lineName.length === 0) return false;
    if (this.stationList.length === 0) return false;

    return true;
  }

  alertMessage(lineName, start, end) {
    if (start === end) return LINE.ALERT.SAME_STATION;
    if (lineName.length === 0) return LINE.ALERT.EMPTY;
    if (this.lineList[lineName]) return LINE.ALERT.DUPLICATION;

    return LINE.ALERT.EMPTY_STATION;
  }
}
