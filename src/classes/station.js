import { STATION_NAME_LENGTH_LOW_LIMIT } from '../configuration.js';
import { getItemFromLocalStorage } from '../utils/util-local-storage.js';

export class Station {
  constructor(name) {
    this.name = name;
    this.lineList = [];
  }

  unableToAddStation(stationList) {
    if (this.name.replace(/ /g, '').length == 0) {
      return 'STATION_NAME_ONLY_SPACE';
    }
    if (this.name.replace(/ /g, '').length < STATION_NAME_LENGTH_LOW_LIMIT) {
      return 'STATION_NAME_TOO_SHORT';
    }
    if (stationList?.map((v) => v.name).includes(this.name)) {
      return 'STATION_NAME_ALREADY_REGISTERED';
    }
    return false;
  }

  unableToDeleteStation() {
    const station = getItemFromLocalStorage('station', this.name);

    if (station.lineList.length) {
      return 'STATION_REGISTERED_TO_LINE';
    }
  }

  deleteLine(line) {
    let index = this.lineList.indexOf(line);
    this.lineList.arr.splice(index, 1);
  }
}
