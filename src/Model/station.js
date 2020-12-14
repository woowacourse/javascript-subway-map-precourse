import {getLocalStorage} from '../Controller/local-storage.js';
import {KEY} from '../Controller/utils.js';

export default class Station {
  constructor() {
    this.stations = [];
  }

  loadStation() {
    const stations = getLocalStorage(KEY.STATION);
    if (stations) {
      return (this.stations = stations);
    }
  }

  addStation(value) {
    return this.stations.push(value);
  }

  removeStation(value) {
    const removedStationIndex = this.stations.indexOf(value);

    return this.stations.splice(removedStationIndex, 1);
  }
}
