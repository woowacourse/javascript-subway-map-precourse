import Component from '../factory/Component.js';
import Line from '../factory/Line.js';
import { LINE_SELECTOR } from '../share/selector.js';
import {
  isOverlap,
  isSameStation,
  deleteWhiteSpace,
  isEmpty,
} from '../share/utils.js';
import { lineTableTemplate, optionTemplate } from '../share/template.js';
import { DATA_KEY, LINE_WORDS } from '../share/words.js';

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
    this.table = this.container.querySelector(`#${LINE_SELECTOR.TABLE_BODY}`);

    this.form.addEventListener('submit', this.onSubmit);
    this.table.addEventListener('click', this.onTableClick);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const constructorObj = this.getValues();
    const newLine = new Line(constructorObj);
    if (!this.isValid(newLine)) return;
    this.addToTable(newLine, DATA_KEY.LINE_LIST);
    this.clearInput();
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    if (className !== LINE_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!confirm(LINE_WORDS.CONFIRM_MESSAGE)) return;
    this.deleteFromTable(index, DATA_KEY.LINE_LIST);
  };

  isValid({ name, startStation, endStation }) {
    if (isEmpty(name)) {
      alert(LINE_WORDS.ALERT_MESSAGE_NO_WHITESPACE);
      return false;
    }
    if (isOverlap(name, this.getAllLineNames())) {
      alert(LINE_WORDS.ALERT_MESSAGE_SAME_NAME);
      return false;
    }
    if (isSameStation(startStation, endStation)) {
      alert(LINE_WORDS.ALERT_MESSAGE_SAME_STATION);
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

  updateStationList() {
    this.startStationSelector.innerHTML = this.data.stationList
      .map((station) => optionTemplate(station))
      .join('');
    this.endStationSelector.innerHTML = this.data.stationList
      .map((station) => optionTemplate(station))
      .join('');
  }

  template() {
    return this.data.lineList
      .map((line, index) => lineTableTemplate({
        ...line,
        index,
        buttonClass: LINE_SELECTOR.DELETE_BUTTON_CLASS,
      }))
      .join('');
  }

  render() {
    this.updateStationList();
    this.updateTable(this.template());
  }
}
