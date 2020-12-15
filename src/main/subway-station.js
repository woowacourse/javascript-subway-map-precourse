import {STATION, STORAGE} from '../constants.js';
import {getList} from './subway-local-storage.js';

export default class SubwayStation {
  constructor() {
    this.stationList = getList(STORAGE.STATION.KEY) || [];
    this.lineList = getList(STORAGE.LINE.KEY) || [];
  }

  addStation = (station, cb) => {
    if (!this.isValidStation(station)) {
      return cb(this.alertMessage(station));
    }

    this.stationList.push(station);

    return cb(null, this.stationList);
  }

  deleteStation = (targetId, cb) => {
    if (this.isRegisteredStation(targetId)) {
      return cb(STATION.ALERT.REGISTERED);
    }

    this.stationList.splice(targetId, 1);

    return cb(null, this.stationList);
  }

  isRegisteredStation(targetId) {
    return this.hasRegisteredStation(targetId);
  }

  isValidStation(station) {
    return this.hasValidName(station);
  }

  hasValidName(station) {
    if (this.stationList.includes(station)) return false;
    if (station.length < 2 ) return false;

    return true;
  }

  hasRegisteredStation(targetId) {
    const station = this.stationList[targetId];

    for (const lineName in this.lineList) {
      if (this.lineList[lineName].some(line => line.name === station)) {
        return true;
      }
    }

    return false;
  }

  alertMessage(station) {
    if (station.length < 2) {
      return STATION.ALERT.LENGTH;
    }

    return STATION.ALERT.DUPLICATION;
  }
}
