import { getArrayFromLocalStorage } from '../util/util-local-storage.js';
import { STATION_NAME_LENGTH_LOW_LIMIT } from '../configuration.js';

export class Station {
  constructor(name) {
    this.name = name;
    this.lineList = [];
  }

  unableToAdd() {
    const stationList = getArrayFromLocalStorage('station');

    if (this.name.replace(/ /g, '').length == 0) {
      return 'stationNameOnlySpace';
    }
    if (this.name.replace(/ /g, '').length < STATION_NAME_LENGTH_LOW_LIMIT) {
      return 'stationNameTooShort';
    }
    if (stationList?.map((v) => v.name).includes(this.name)) {
      return 'stationNameAlreadyExist';
    }
    return false;
  }

  unableToDelete() {
    if (this.lineList.length) {
      return 'stationRegisteredToLine';
    }
  }

  deleteLine(line) {
    let index = this.lineList.indexOf(line);
    this.lineList.arr.splice(index, 1);
  }
}
