export default class SubwayStation {
  static checkIsLineNameShort(line) {
    return line.name.length < 2;
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
