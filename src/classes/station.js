import { getLocalStorageAsArray } from '../util/util-local-storage.js';
import {
  STATION_NAME_LENGTH_LOW_LIMIT,
  EXCEPTION_MESSAGE,
} from '../configuration.js';

export class Station {
  constructor(name) {
    this.name = name;
    this.lineList = [];
  }

  unableToAdd() {
    const stationList = getLocalStorageAsArray('station');

    if (this.name.length < STATION_NAME_LENGTH_LOW_LIMIT) {
      return EXCEPTION_MESSAGE['stationNameTooShort'];
    }
    if (stationList?.map((v) => v.name).includes(this.name)) {
      return EXCEPTION_MESSAGE['stationNameAlreadyExist'];
    }
    return false;
  }

  unableToDelete() {
    if (this.lineList.length) {
      return EXCEPTION_MESSAGE['stationRegisteredToLine'];
    }
  }

  deleteLine(line) {
    let index = this.lineList.indexOf(line);
    this.lineList.arr.splice(index, 1);
  }
}
