import { getArrayFromLocalStorage } from '../util/util-local-storage.js';

export class Line {
  constructor(name, stationList) {
    this.name = name;
    this.stationList = stationList;
  }

  unableToAddLine() {
    const lineList = getArrayFromLocalStorage('line');

    if (this.stationList[0] === this.stationList[1]) {
      return 'bothStartEndSame';
    }
    if (this.name.replace(/ /g, '').length == 0) {
      return 'lineNameOnlySpace';
    }
    if (lineList?.map((v) => v.name).includes(this.name)) {
      return 'lineNameAlreadyRegistered';
    }
    return false;
  }

  unableToDeleteLine() {
    return false;
  }

  unableToAddSection(station, order) {
    console.log(station, order);
    if (this.stationList.includes(station)) {
      return 'sectionAleardyRegistered';
    }
    if (order.replace(/ /g, '').length == 0) {
      return 'orderOnlySpace';
    }
    if (isNaN(order)) {
      return 'orderNotNumber';
    }
    if (!Number.isInteger(+order)) {
      return 'orderNotInteger';
    }
    if (+order < 0) {
      return 'orderNegativeNumber';
    }
    return false;
  }

  unableToDeleteSection() {
    return false;
  }

  addStation(station, order) {
    this.stationList.splice(order, 0, station);
  }

  deleteStation(station) {
    let index = this.stationList.indexOf(station);
    this.stationList.splice(index, 1);
  }
}
