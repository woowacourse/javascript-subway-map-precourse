export default class Line {
  constructor(_name, _inLineStations) {
    this.name = _name;
    this.inLineStations = _inLineStations;
  }

  lineLength() {
    return this.inLineStations.length;
  }

  startStation() {
    return this.inLineStations[0];
  }

  endStation() {
    return this.inLineStations[this.lineLength() - 1];
  }

  addStation(_sectionStationName, _sectionOrder) {
    this.inLineStations = [
      ...this.inLineStations.slice(undefined, _sectionOrder),
      _sectionStationName,
      ...this.inLineStations.slice(_sectionOrder, undefined),
    ];
  }

  deleteStation(_sectionOrder) {
    this.inLineStations.splice(_sectionOrder, 1);
  }
}
