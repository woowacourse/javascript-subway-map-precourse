import Component from '../factory/Component.js';
import { STATION } from '../share/selector.js';
import { checkOverlap, checkValueLength } from '../share/utils.js';

const MIN_STATION_NAME_LENGTH = 2;
export default class StationManager extends Component {
  constructor(props) {
    super(props);
    this.state.stationList = [];

    this.userInput = this.container.querySelector(
      `#${STATION.STATION_NAME_INPUT_ID}`,
    );
    this.addBtn = this.container.querySelector(
      `#${STATION.STATION_ADD_BUTTON_ID}`,
    );
    this.form = this.container.querySelector(`#${STATION.STATION_FORM_ID}`);

    this.form.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { value } = this.userInput;
    this.updateStationList(value);
  };

  updateStationList(station) {
    if (!this.checkValidity(station)) return;
    const newStationList = [...this.state.stationList];
    newStationList.push(station);
    this.setState({
      stationList: newStationList,
    });
  }

  checkValidity(value) {
    return (
      checkOverlap(value, this.state.stationList) &&
      checkValueLength(value, MIN_STATION_NAME_LENGTH)
    );
  }
}
