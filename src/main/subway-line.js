import {LINE, STORAGE} from '../constants.js';
import {getList} from './subway-local-storage.js';
import {lineModel} from '../model/subway-model.js';

export default class SubwayLine {
  constructor() {
    this.stationList = getList(STORAGE.STATION.KEY) || [];
    this.lineList = getList(STORAGE.LINE.KEY) || {};
  }

  addLine = (lineName, start, end, cb) => {
    if (!this.isValidLine(lineName)) {
      return cb(this.alertMessage(lineName));
    }

    this.lineList = Object.assign(
        {}, this.lineList, lineModel(lineName, start.text, end.text),
    );

    return cb(null, this.lineList);
  }

  deleteLine = (lineName, cb) => {
    const {[lineName]: [], ...withoutDeletedLine} = this.lineList;

    this.lineList = withoutDeletedLine;

    return cb(this.lineList);
  }

  isValidLine(lineName) {
    return this.hasValidName(lineName);
  }

  hasValidName(lineName) {
    if (this.lineList[lineName]) return false;
    if (lineName.length === 0) return false;
    if (this.stationList.length === 0) return false;

    return true;
  }

  alertMessage(lineName) {
    if (lineName.length === 0) return LINE.ALERT.EMPTY;

    if (this.lineList[lineName]) return LINE.ALERT.DUPLICATION;

    return LINE.ALERT.EMPTY_STATION;
  }
}
