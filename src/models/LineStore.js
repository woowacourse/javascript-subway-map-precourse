import Line from "./Line.js";
import { loadLines } from "../utils/storage.js";

class LineStore {
  constructor(key) {
    this.key = key;
    this.lines = loadLines(key);
  }

  getLines() {
    return [...this.lines];
  }

  getLine(name) {
    return this.getLines().find(line => line.name === name);
  }

  getLineNames() {
    return this.getLines().map(line => line.name);
  }

  addLine(name, startStation, EndStation) {
    const newLine = new Line(name, startStation, EndStation);
    this.lines = [...this.getLines(), newLine];
  }

  removeLine(name) {
    const lines = this.getLines();
    this.lines = lines.filter(line => line.name !== name);
  }
}

export default new LineStore(`TEST_LINE`);
