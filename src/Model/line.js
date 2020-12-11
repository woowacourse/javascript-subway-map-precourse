export default class Line {
  constructor() {
    this.lines = [];
  }

  loadLine() {}

  addLine(line) {
    return this.lines.push(line);
  }

  removeLine(line) {
    const removedLineIndex = this.lines.findIndex((v) => v.lineName === line);

    return this.lines.splice(removedLineIndex, 1);
  }
}
