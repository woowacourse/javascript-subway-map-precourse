import { getArrayFromLocalStorage } from '../util/util-local-storage.js';

export class Line {
  constructor(name, stationList) {
    this.name = name;
    this.stationList = stationList;
  }

  unableToAdd() {
    const lineList = getArrayFromLocalStorage('line');

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

  unableToDelete() {
    return false;
  }

  addStation(station, order) {
    this.stationList.splice(order, 0, station);
  }

  deleteStation(station) {
    let index = this.stationList.indexOf(station);
    this.stationList.splice(index, 1);
  }

  printLine() {}
}
