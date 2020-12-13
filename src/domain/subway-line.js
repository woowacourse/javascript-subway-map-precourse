export default class SubwayLine {
  constructor(lineName, upLine, DownLine, id) {
    this.lineName = lineName;
    this.stations = [upLine, DownLine];
    this.id = id;
    this.type = "LINE";
  }
}
