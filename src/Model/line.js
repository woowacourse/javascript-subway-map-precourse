import {getLocalStorage} from '../Controller/local-storage.js';

export default class Line {
  constructor() {
    this.lines = [];
  }

  loadLine() {
    const lines = getLocalStorage('line');

    if (lines) {
      return (this.lines = lines);
    }
  }

  addLine(line) {
    return this.lines.push(line);
  }

  removeLine(line) {
    const removedLineIndex = this.lines.findIndex((v) => v.lineName === line);

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
