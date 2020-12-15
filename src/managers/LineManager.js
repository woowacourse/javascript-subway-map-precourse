import Component from '../factory/Component.js';
import Line from '../factory/Line.js';
import { LINE_SELECTOR } from '../share/selector.js';
import {
  checkOverlap,
  checkSameStation,
  customConfirm,
  deleteWhiteSpace,
} from '../share/utils.js';
import { lineTableTemplate, optionTemplate } from '../share/template.js';
import { DATA_KEY } from '../share/words.js';

const CONFIRM_MESSAGE = '정말 노선을 삭제하시겠습니까?';
const ALERT_MESSAGE_SAME_STATION = '상행 종점과 하행 종점은 달라야 합니다.';
const ALERT_MESSAGE_SAME_NAME = '이미 등록된 노선이름입니다.';
const ALERT_MESSAGE_NO_WHITESPACE = '노선이름은 공백으로 지정할 수 없습니다.';
export default class LineManager extends Component {
  constructor(props) {
    super(props);

    this.form = this.container.querySelector(`#${LINE_SELECTOR.FORM_ID}`);
    this.userInput = this.container.querySelector(
      `#${LINE_SELECTOR.NAME_INPUT_ID}`,
    );
    this.startStationSelector = this.container.querySelector(
      `#${LINE_SELECTOR.START_STATION_SELECTOR_ID}`,
    );
    this.endStationSelector = this.container.querySelector(
      `#${LINE_SELECTOR.END_STATION_SELECTOR}`,
    );
    this.addButton = this.container.querySelector(
      `#${LINE_SELECTOR.ADD_BUTTON_ID}`,
    );
    this.table = this.container.querySelector(`#${LINE_SELECTOR.TABLE_BODY}`);

    this.form.addEventListener('submit', this.onSubmit);
    this.table.addEventListener('click', this.onTableClick);
  }

  updateStationList() {
    this.startStationSelector.innerHTML = this.data.stationList
      .map((station) => optionTemplate(station))
      .join('');
    this.endStationSelector.innerHTML = this.data.stationList
      .map((station) => optionTemplate(station))
      .join('');
  }

  onSubmit = (event) => {
    event.preventDefault();
    const constructorObj = this.getValues();
    const newLine = new Line(constructorObj);
    if (!this.checkValidity(newLine)) return;
    this.addToTable(newLine, DATA_KEY.LINE_LIST);
    this.clearInput();
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    if (className !== LINE_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!customConfirm(CONFIRM_MESSAGE)) return;
    this.deleteFromTable(index, DATA_KEY.LINE_LIST);
  };

  checkValidity({ name, startStation, endStation }) {
    if (!name.length) {
      alert(ALERT_MESSAGE_NO_WHITESPACE);
      return false;
    }
    if (!checkOverlap(name, this.getAllLineNames())) {
      alert(ALERT_MESSAGE_SAME_NAME);
      return false;
    }
    if (!checkSameStation(startStation, endStation)) {
      alert(ALERT_MESSAGE_SAME_STATION);
      return false;
    }
    return true;
  }

  getAllLineNames = () => this.data.lineList.map((line) => line.name);

  getValues = () => {
    const name = deleteWhiteSpace(this.userInput.value);
    const { value: startStation } = this.startStationSelector;
    const { value: endStation } = this.endStationSelector;
    return { name, startStation, endStation };
  };

  template() {
    return this.data.lineList
      .map((line, index) =>
        lineTableTemplate({
          ...line,
          index,
          buttonClass: LINE_SELECTOR.DELETE_BUTTON_CLASS,
        }),
      )
      .join('');
  }

  render() {
    this.updateStationList();
    this.updateTable(this.template());
  }
}
