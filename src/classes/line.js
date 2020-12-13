import { getLocalStorageAsArray } from '../util/util-local-storage.js';

export class Line {
  constructor(name, startPoint, endPoint) {
    this.name = name;
    this.stationList = [startPoint, endPoint];
  }

  unableToAdd() {
    const lineList = getLocalStorageAsArray('line');

    if (this.stationList[0] === this.stationList[1]) {
      return 'bothStartEndSame';
    }
    if (this.name.replace(/ /g, '').length == 0) {
      return 'lineNameOnlySpace';
    }
    if (lineList?.map((v) => v.name).includes(this.name)) {
      return 'lineNameAlreadyExist';
    }
    return false;
  }

  unableToDelete() {}

  addStation(station, order) {
    this.stationList.splice(order, 0, station);
  }

  deleteStation(station) {
    let index = this.stationList.indexOf(station);
    this.stationList.splice(index, 1);
  }

  printLine() {}
}
