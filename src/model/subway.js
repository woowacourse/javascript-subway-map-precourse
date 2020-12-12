export class Station {
  constructor(name) {
    this.name = name;
    this.line = 0;
  }
}

export class Line {
  constructor(name, section) {
    this.name = name;
    this.section = section; // 배열의 형태로
  }
}
