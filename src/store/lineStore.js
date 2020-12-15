import Observer from "./observer.js";
import { saveStorage } from "../utils/storage.js";
import { STORAGE_KEY } from "../utils/constants/key.js";

class LineStore extends Observer {
  constructor(lines) {
    super();
    this.lines = lines;
  }

  getLine(name) {
    return this.lines.find(line => line.name === name);
  }

  getLineNames() {
    return this.lines.map(line => line.name);
  }

  addLine(name, startStation, endStation) {
    const newLine = {
      name,
      sections: [startStation, endStation],
    };

    const lines = [...this.lines, newLine];
    this.setLines(lines);
  }

  removeLine(name) {
    const lines = this.lines.filter(line => line.name !== name);
    this.setLines(lines);
  }

  addSection(lineName, station, order) {
    const sections = [...this.getLine(lineName).sections];
    sections.splice(order, 0, station);

    const newLines = this.lines.map(line => {
      return line.name === lineName ? { ...line, sections } : line;
    });

    this.setLines(newLines);
  }

  removeSection(lineName, order) {
    const sections = [...this.getLine(lineName).sections];
    sections.splice(order, 1);

    const newLines = this.lines.map(line => {
      return line.name === lineName ? { ...line, sections } : line;
    });

    this.setLines(newLines);
  }

  setLines(lines) {
    this.lines = lines;
    this.notify();
    saveStorage(STORAGE_KEY.LINE, this.lines);
  }
}

export default LineStore;
