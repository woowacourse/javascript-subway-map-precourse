import Component from '../factory/Component.js';
import { SECTION_SELECTOR } from '../share/selector.js';
import {
  optionTemplate,
  sectionDetailTableTemplate,
} from '../share/template.js';
import { checkOverlap } from '../share/utils.js';
import { SECTION_DETAIL_WORDS } from '../share/words.js';

export default class SectionDetailManager extends Component {
  constructor(props) {
    super(props);

    this.form = this.container.querySelector(`#${SECTION_SELECTOR.FORM_ID}`);
    this.formHeader = this.container.querySelector(
      `#${SECTION_SELECTOR.FORM_HEADER_ID}`,
    );
    this.stationSelector = this.container.querySelector(
      `#${SECTION_SELECTOR.STATION_SELECTOR_ID}`,
    );
    this.userInput = this.container.querySelector(
      `#${SECTION_SELECTOR.ORDER_INPUT_ID}`,
    );
    this.addButton = this.container.querySelector(
      `#${SECTION_SELECTOR.ADD_BUTTON_ID}`,
    );
    this.table = this.container.querySelector(
      `#${SECTION_SELECTOR.TABLE_BODY}`,
    );

    this.form.addEventListener('submit', this.onSubmit);
    this.table.addEventListener('click', this.onTableClick);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const targetLine = this.data.currentLineData;
    if (!this.checkValidity(targetLine)) return;
    targetLine.addStationToSection(this.getValues());
    this.syncData(this.data);
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    const targetLine = this.data.currentLineData;
    if (className !== SECTION_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!confirm(SECTION_DETAIL_WORDS.CONFIRM_MESSAGE)) return;
    if (targetLine.checkSectionLength()) {
      alert(SECTION_DETAIL_WORDS.ALERT_MESSAGE_SECTION_MINLENGTH);
      return;
    }
    targetLine.deleteStationFromSection({ index });
    this.syncData(this.data);
  };

  checkValidity(targetLine) {
    const { stationName } = this.getValues();
    if (!checkOverlap(stationName, targetLine.section)) {
      alert(SECTION_DETAIL_WORDS.ALERT_MESSAGE_SECTION_INCLUDES_STATION);
      return false;
    }
    return true;
  }

  getValues() {
    const { value: stationName } = this.stationSelector;
    const { value: index } = this.userInput;
    return { stationName, index };
  }

  updateOptions() {
    this.stationSelector.innerHTML = this.data.stationList
      .map((station) => optionTemplate(station))
      .join('');
  }

  updateFormHeader() {
    const { name } = this.data.currentLineData;
    this.formHeader.innerHTML = `${name} 관리`;
  }

  template() {
    return this.data.currentLineData.section
      .map((station, index) => sectionDetailTableTemplate({
        name: station,
        index,
        buttonClass: SECTION_SELECTOR.DELETE_BUTTON_CLASS,
      }))
      .join('');
  }

  render() {
    this.updateOptions();
    this.updateFormHeader();
    this.updateTable(this.template());
  }
}
