export default class Section {
  constructor(stationName, order, lineName) {
    this.stationName = stationName;
    this.order = Number(order);
    this.lineName = lineName;
  }
}
