export class Station {
  constructor(name, line, section) {
    this.name = name;
    this.line = line;
    this.section = section;
  }
}

export class Line {
  constructor(station, name, section) {
    this.station = station;
    this.name = name;
    this.section = section;
  }
}
