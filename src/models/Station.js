class Station {
  constructor(name) {
    this.name = name;
    this.lines = new Set();
  }

  addLine(lineName) {
    this.lines.add(lineName);
  }

  removeLine(lineName) {
    this.lines.delete(lineName);
  }
}

export default Station;
