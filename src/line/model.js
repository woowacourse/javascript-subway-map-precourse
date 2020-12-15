export default class Line {
  constructor(lineName, startStationInput, endStationInput) {
    this.name = lineName;
    this.line = [startStationInput, endStationInput];
  }
}