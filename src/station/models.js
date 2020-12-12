export default class Station {
  constructor(_name, _usedCount = 0) {
    this.name = _name;
    this.usedCount = _usedCount;
  }

  useStation() {
    this.used += 1;
  }

  disUseStation() {
    this.used -= 1;
  }
}
