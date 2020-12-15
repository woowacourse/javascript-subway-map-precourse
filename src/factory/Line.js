import { checkOverlap, checkValueLength } from '../share/utils.js';

const MIN_SECTION_LENGTH = 2;
const ALERT_MESSAGE_SECTION_INCLUDES_STATION = '이미 노선에 포함되어있습니다';
const ALERT_MESSAGE_SECTION_MINLENGTH = '노선은 최소 2개역을 포함해야 합니다.';

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
      alert(ALERT_MESSAGE_SECTION_INCLUDES_STATION);
      return;
    }
    this.section.splice(index, 0, stationName);
    this.updateStartStation();
    this.updateEndStation();
  }

  deleteStationFromSection({ index }) {
    if (this.checkSectionLength()) {
      alert(ALERT_MESSAGE_SECTION_MINLENGTH);
      return;
    }
    this.section.splice(index, 1);
    this.updateStartStation();
    this.updateEndStation();
  }

  checkSectionLength = () => this.section.length === MIN_SECTION_LENGTH;

  updateStartStation() {
    [this.startStation] = this.section;
  }

  updateEndStation() {
    this.endStation = this.section[this.section.length - 1];
  }
}
