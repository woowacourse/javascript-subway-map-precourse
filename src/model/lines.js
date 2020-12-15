import { loadStorage, saveStorage } from '../util/handleStorage.js';
import { NAME } from '../constants/index.js';

export default class Lines {
  constructor() {
    this.lines = [];
  }

  getLines() {
    return this.lines;
  }

  loadLines() {
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);
  }

  addLine(name, section) {
    const line = { name: name, section: section };

    this.lines.push(line);
  }

  saveLines() {
    saveStorage(NAME.LOCALSTORAGE_LINE_KEY, this.lines);
  }

  deleteLine(index) {
    this.lines.splice(index, 1);
  }

  getSections(index) {
    return this.lines[index].section;
  }

  addSection(index, order, station) {
    this.lines[index].section.splice(order, 0, station);
  }

  deleteSection(lineIndex, sectionIndex) {
    this.lines[lineIndex].section.splice(sectionIndex, 1);
  }
}
