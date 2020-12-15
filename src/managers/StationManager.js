import Component from '../factory/Component.js';
import { STATION_SELECTOR } from '../share/selector.js';
import {
  checkOverlap,
  checkValueLength,
  customConfirm,
  deleteWhiteSpace,
} from '../share/utils.js';
import { stationTableTemplate } from '../share/template.js';

const MIN_STATION_NAME_LENGTH = 2;
const CONFIRM_MESSAGE = '정말로 삭제하시겠습니까?';

const ALERT_MESSAGE_SECTION_INCLUDES_STATION =
  '노선에 포함되어있어 삭제가 불가능합니다.';
const ALERT_MESSAGE_STATION_MINLENGTH =
  '역은 공백을 제외하고 2자 이상이여야 합니다.';
const ALERT_MESSAGE_ALREADY_INCLUDE = '이미 등록된 역입니다.';
export default class StationManager extends Component {
  constructor(props) {
    super(props);

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
    const stationName = deleteWhiteSpace(this.userInput.value);
    this.addStationToList(stationName);
    this.clearInput();
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    const { name: stationName } = event.target.parentNode.parentNode.dataset;
    if (className !== STATION_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!customConfirm(CONFIRM_MESSAGE)) return;
    if (!checkOverlap(stationName, this.getAllStationNamesInLines())) {
      alert(ALERT_MESSAGE_SECTION_INCLUDES_STATION);
      return;
    }
    this.deleteStationFromList(index);
  };

  addStationToList(station) {
    if (!this.checkValidity(station)) return;
    const newStationList = [...this.data.stationList];
    newStationList.push(station);
    const newData = { ...this.data };
    newData.stationList.push(station);
    this.props.syncData(newData);
  }

  deleteStationFromList(index) {
    const newData = { ...this.data };
    newData.stationList.splice(index, 1);
    this.props.syncData(newData);
  }

  getAllStationNamesInLines() {
    return [...new Set(this.data.lineList.map((line) => line.section).flat())];
  }

  checkValidity(value) {
    if (!checkOverlap(value, this.data.stationList)) {
      alert(ALERT_MESSAGE_ALREADY_INCLUDE);
      return false;
    }
    if (!checkValueLength(value, MIN_STATION_NAME_LENGTH)) {
      alert(ALERT_MESSAGE_STATION_MINLENGTH);
      return false;
    }
    return true;
  }

  clearInput() {
    this.userInput.value = '';
  }

  template() {
    return this.data.stationList
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
    console.log('rendered!');
    console.log(this);
    this.table.innerHTML = this.template();
  }
}
