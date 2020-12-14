export default class Line {
  constructor(lineName, startStationInput, endStationInput) {
    this.name = lineName
    this.position = "line"
    this.line = [startStationInput, endStationInput]
  }
}