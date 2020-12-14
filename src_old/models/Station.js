class Station {
  constructor(name) {
    this.name = name;
    this.lines = [];
  }

  addLine(lineName) {
    this.lines = [...this.lines, lineName];
  }

  removeLine(lineName) {
    this.lines = this.lines.filter(line => line !== lineName);
  }
}

export default Station;
