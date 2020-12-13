import { SUBWAY_STATION_NAME_LENGTH_LIMIT } from '../constants/configuration.js';

export default class SubwayStation {
  static checkIsLineNameShort(line) {
    return line.name.length < SUBWAY_STATION_NAME_LENGTH_LIMIT;
  }

  static checkIsStationBelongToLine(station) {
    return station.belongingLines.length > 0;
  }

  constructor(name) {
    this.name = name;
    this.nextStations = [];
    this.prevStations = [];
    this.belongingLines = [];
  }
}
