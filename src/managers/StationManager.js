import Component from '../factory/Component.js';
import { STATION_SELECTOR } from '../share/selector.js';
import {
  isOverlap,
  isValidLength,
  deleteWhiteSpace,
} from '../share/utils.js';
import { stationTableTemplate } from '../share/template.js';
import { DATA_KEY, STATION_WORDS } from '../share/words.js';

const MIN_STATION_NAME_LENGTH = 2;

export default class StationManager extends Component {
  constructor(props) {
    super(props);

    this.userInput = this.container.querySelector(
      `#${STATION_SELECTOR.NAME_INPUT_ID}`,
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
    if (!this.isValid(stationName)) return;
    this.addToTable(stationName, DATA_KEY.STATION_LIST);
    this.clearInput();
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    const { name: stationName } = event.target.parentNode.parentNode.dataset;
    if (className !== STATION_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!confirm(STATION_WORDS.CONFIRM_MESSAGE)) return;
    if (isOverlap(stationName, this.getAllStationNamesInLines())) {
      alert(STATION_WORDS.ALERT_MESSAGE_SECTION_INCLUDES_STATION);
      return;
    }
    this.deleteFromTable(index, DATA_KEY.STATION_LIST);
  };

  isValid(value) {
    if (isOverlap(value, this.data.stationList)) {
      alert(STATION_WORDS.ALERT_MESSAGE_ALREADY_INCLUDE);
      return false;
    }
    if (!isValidLength(value, MIN_STATION_NAME_LENGTH)) {
      alert(STATION_WORDS.ALERT_MESSAGE_STATION_MINLENGTH);
      return false;
    }
    return true;
  }

  getAllStationNamesInLines() {
    return [...new Set(this.data.lineList.map((line) => line.section).flat())];
  }

  template() {
    return this.data.stationList
      .map((station, index) => stationTableTemplate({
        stationName: station,
        index,
        buttonClass: STATION_SELECTOR.DELETE_BUTTON_CLASS,
      }))
      .join('');
  }

  render() {
    this.updateTable(this.template());
  }
}
