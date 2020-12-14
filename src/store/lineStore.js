import Observer from "./observer.js";

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

  setLines(lines) {
    this.lines = lines;
    this.notify();
  }
}

export default LineStore;
