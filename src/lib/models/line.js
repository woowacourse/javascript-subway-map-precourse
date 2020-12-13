export default class Line {
  constructor(props) {
    const { lineName, startStation, endStation, stations } = props;
    this.lineName = lineName;
    this.startStation = startStation;
    this.endStation = endStation;
    if (!stations) this.stations = [startStation, endStation];
  }
}
