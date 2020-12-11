export default class Station {
  constructor(name) {
    this.name = name;
    this.used = 0;
  }

  useStation = () => {
    this.used += 1;
  };

  disUseStation = () => {
    this.used -= 1;
  };
}
