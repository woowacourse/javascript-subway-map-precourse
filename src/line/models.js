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

  add(_sectionName, _sectionOrder) {
    this.inLineStations = [
      ...this.inLineStations.slice(undefined, _sectionOrder),
      _sectionName,
      ...this.inLineStations.slice(_sectionOrder, undefined),
    ];
  }
}
