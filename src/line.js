export default class SubwayLine {
  constructor(lineName, start, end) {
    this.lineName = lineName;
    this.start = start;
    this.end = end;
    this.stations = [start, end];
  }
}
