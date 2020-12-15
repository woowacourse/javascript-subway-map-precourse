export default class Line {
  constructor() {
    this.lines = [];
  }

  loadLine(lines) {
    if (lines) {
      return (this.lines = lines);
    }
  }

  addLine(line) {
    return this.lines.push(line);
  }

  removeLine(lineName) {
    const removedLineIndex = this.lines.findIndex(
      (v) => v.lineName === lineName,
    );

    return this.lines.splice(removedLineIndex, 1);
  }

  updateAddLine(selectedLine, lineValue) {
    return selectedLine.station.splice(
      lineValue.number,
      0,
      lineValue.sectionName,
    );
  }

  updateRemoveLine(selectedLine, removedSectionName) {
    const removedSectionIndex = selectedLine.station.indexOf(
      removedSectionName,
    );

    return selectedLine.station.splice(removedSectionIndex, 1);
  }
}
