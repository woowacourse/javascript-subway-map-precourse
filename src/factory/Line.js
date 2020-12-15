import { checkOverlap } from '../share/utils.js';

export default class Line {
  constructor(props) {
    this.props = props;
    this.name = props.name;
    this.startStation = props.startStation;
    this.endStation = props.endStation;
    this.section = this.getSection();
  }

  getSection = () => this.props.section || [this.startStation, this.endStation];

  addStationToSection({ stationName, index }) {
    if (!checkOverlap(stationName, this.section)) {
      alert('이미 노선에 포함되어있습니다');
      return;
    }
    this.section.splice(index, 0, stationName);
    this.updateStartStation();
    this.updateEndStation();
  }

  deleteStationFromSection({ index }) {
    this.section.splice(index, 1);
    this.updateStartStation();
    this.updateEndStation();
  }

  updateStartStation() {
    [this.startStation] = this.section;
  }

  updateEndStation() {
    this.endStation = this.section[this.section.length - 1];
  }
}
