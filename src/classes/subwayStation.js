export default class SubwayStation {
  constructor(name) {
    this.name = name;
    this.nextStations = [];
    this.prevStations = [];
    this.belongingLines = [];
  }
}
