export class Station {
  constructor(name, line, section) {
    this.name = name;
    this.line = line;
    this.section = section;
  }
}

export class Line {
  constructor(name, section) {
    this.name = name;
    this.section = section; // 배열의 형태로
  }
}
