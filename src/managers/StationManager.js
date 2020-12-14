import Component from '../factory/Component.js';
import { STATION } from '../share/selector.js';
import { checkOverlap, checkValueLength, customConfirm } from '../share/utils.js';
import { stationTableTemplate } from '../share/template.js';

const MIN_STATION_NAME_LENGTH = 2;
const CONFIRM_MSG = '정말로 삭제하시겠습니까?';

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
    this.table = this.container.querySelector(`#${STATION.STATION_TABLE_BODY}`);

    this.form.addEventListener('submit', this.onSubmit);
    this.table.addEventListener('click', this.onTableClick);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { value } = this.userInput;
    this.addStationToList(value);
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    if (className !== STATION.STATION_DELETE_BUTTON_CLASS) return;
    if (!customConfirm(CONFIRM_MSG)) return;
    this.deleteStationFromList(index);
  }

  addStationToList(station) {
    if (!this.checkValidity(station)) return;
    const newStationList = [...this.state.stationList];
    newStationList.push(station);
    this.setState({
      stationList: newStationList,
    });
  }

  deleteStationFromList(index) {
    const newStationList = [...this.state.stationList];
    newStationList.splice(index, 1);
    this.setState({
      stationList: newStationList,
    });
  }

  checkValidity(value) {
    return (
      checkOverlap(value, this.state.stationList)
      && checkValueLength(value, MIN_STATION_NAME_LENGTH)
    );
  }

  template() {
    return this.state.stationList
      .map((station, index) => stationTableTemplate(
        station,
        index,
        STATION.STATION_DELETE_BUTTON_CLASS,
      ))
      .join('');
  }

  render() {
    this.table.innerHTML = this.template();
  }
}
