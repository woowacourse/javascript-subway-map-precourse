export default class StationLine {
  constructor(name, stationList) {
    this.name = name;
    this.section = stationList;
  }

  addStationToLine(order, station) {
    this.section.push("");
    for (let i = this.section.length - 1; i > order; i--) {
      this.section[i] = this.section[i - 1];
    }
    this.section[order] = station;
  }
}
