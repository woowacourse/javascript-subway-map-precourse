import { getLocalStorageByKey } from '../util/utilUI.js';
import { ALERT_MESSAGE } from '../configuration.js';

export class Station {
  constructor(name) {
    this.name = name;
    this.lineList = [];
  }

  unableToAdd() {
    const STATION_NAME_LENGTH_LOW_LIMIT = 2;
    const stationList = getLocalStorageByKey('station');

    if (this.name.length < STATION_NAME_LENGTH_LOW_LIMIT) {
      return ALERT_MESSAGE['stationNameTooShort'];
    }
    if (stationList?.map((v) => v.name).includes(this.name)) {
      return ALERT_MESSAGE['stationNameAlreadyExist'];
    }
    return false;
  }

  unableToDelete() {
    return this.line.length;
  }

  deleteLine(line) {
    let index = this.lineList.indexOf(line);
    this.lineList.arr.splice(index, 1);
  }
}
