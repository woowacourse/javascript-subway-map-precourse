export class Station {
  constructor(name) {
    this.name = name;
    this.line = 0;
  }

  /*
  getName() {
    return this.name;
  }

  addLine() {
    this.line += 1
  }
  */
}

export class Line {
  constructor(name, section) {
    this.name = name;
    this.section = section;
  }
}
