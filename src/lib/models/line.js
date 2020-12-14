export default class Line {
  constructor(props) {
    const { lineName, startStation, endStation, stations } = props;
    this.lineName = lineName;
    if (!stations) this.stations = [startStation, endStation];
    else this.stations = stations;
  }
}
