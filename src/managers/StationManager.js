import Component from '../factory/Component.js';
import { STATION_SELECTOR } from '../share/selector.js';
import {
  checkOverlap,
  checkValueLength,
  customConfirm,
} from '../share/utils.js';
import { stationTableTemplate } from '../share/template.js';

const MIN_STATION_NAME_LENGTH = 2;
const CONFIRM_MESSAGE = '정말로 삭제하시겠습니까?';
const ALERT_MESSAGE = '노선에 포함되어있어 삭제가 불가능합니다.';

export default class StationManager extends Component {
  constructor(props) {
    super(props);
    this.state.stationList = [];

    this.userInput = this.container.querySelector(
      `#${STATION_SELECTOR.NAME_INPUT_ID}`,
    );
    this.addButton = this.container.querySelector(
      `#${STATION_SELECTOR.ADD_BUTTON_ID}`,
    );
    this.form = this.container.querySelector(`#${STATION_SELECTOR.FORM_ID}`);
    this.table = this.container.querySelector(
      `#${STATION_SELECTOR.TABLE_BODY}`,
    );

    this.form.addEventListener('submit', this.onSubmit);
    this.table.addEventListener('click', this.onTableClick);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { value } = this.userInput;
    this.addStationToList(value);
    this.clearInput();
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    const { name: stationName } = event.target.parentNode.parentNode.dataset;
    if (className !== STATION_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!customConfirm(CONFIRM_MESSAGE)) return;
    if (!checkOverlap(stationName, this.getAllStationNamesInLines())) {
      alert(ALERT_MESSAGE);
      return;
    }
    this.deleteStationFromList(index);
  };

  addStationToList(station) {
    if (!this.checkValidity(station)) return;
    const newStationList = [...this.state.stationList];
    newStationList.push(station);
    this.setState({
      stationList: newStationList,
    });
    this.props.syncData(this.state);
  }

  deleteStationFromList(index) {
    const newStationList = [...this.state.stationList];
    newStationList.splice(index, 1);
    this.setState({
      stationList: newStationList,
    });
    this.props.syncData(this.state);
  }

  getAllStationNamesInLines() {
    return [...new Set(this.state.lineList.map((line) => line.section).flat())];
  }

  checkValidity(value) {
    return (
      checkOverlap(value, this.state.stationList) &&
      checkValueLength(value, MIN_STATION_NAME_LENGTH)
    );
  }

  clearInput() {
    this.userInput.value = '';
  }

  template() {
    return this.state.stationList
      .map((station, index) =>
        stationTableTemplate(
          station,
          index,
          STATION_SELECTOR.DELETE_BUTTON_CLASS,
        ),
      )
      .join('');
  }

  render() {
    this.table.innerHTML = this.template();
  }
}
