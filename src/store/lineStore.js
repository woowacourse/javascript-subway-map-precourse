import Observer from "./observer.js";

class LineStore extends Observer {
  constructor(lines) {
    super();
    this.lines = lines;
  }

  getLines() {
    return this.lines;
  }

  setLines(lines) {
    this.lines = lines;
    this.notify();
  }
}

export default LineStore;
