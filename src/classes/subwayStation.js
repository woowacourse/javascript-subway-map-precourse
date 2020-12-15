import { SUBWAY_STATION_NAME_LENGTH_LIMIT } from '../constants/configuration.js';

export default class SubwayStation {
  static checkIsStationNameShort(stationName) {
    return stationName.length < SUBWAY_STATION_NAME_LENGTH_LIMIT;
  }

  static checkIsStationBelongToLine(station) {
    return station.belongingLineNames.length > 0;
  }

  constructor() {
    this.belongingLineNames = [];
  }

  addBeloningLineByLineName(lineName) {
    this.belongingLineNames.push(lineName);
  }

  deleteBeloningLineByLineName(lineName) {
    const deleteLineIndex = this.belongingLineNames.indexOf(lineName);
    this.belongingLineNames.splice(deleteLineIndex, 1);
  }
}
