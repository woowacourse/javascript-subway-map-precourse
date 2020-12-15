export default class Line {
  constructor(props) {
    this.name = props.name;
    this.startStation = props.startStation;
    this.endStation = props.endStation;
    this.section = [this.startStation, this.endStation];
  }

  updateSection({ stationName, index }) {
    this.section.splice(index, 0, stationName);
  }
}
