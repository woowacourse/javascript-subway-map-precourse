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
}
