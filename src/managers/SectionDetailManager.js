import Component from '../factory/Component.js';
import { SECTION_SELECTOR } from '../share/selector.js';
import {
  optionTemplate,
  sectionDetailTableTemplate,
} from '../share/template.js';
import { customConfirm } from '../share/utils.js';

const CONFIRM_MESSAGE = '정말로 삭제하시겠습니까?';

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
    this.orderInput = this.container.querySelector(
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
    targetLine.addStationToSection(this.getValues());
    this.props.syncData(this.data);
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    const targetLine = this.data.currentLineData;
    if (className !== SECTION_SELECTOR.DELETE_BUTTON_CLASS) return;
    if (!customConfirm(CONFIRM_MESSAGE)) return;
    targetLine.deleteStationFromSection({ index });
    this.props.syncData(this.data);
  };

  getValues() {
    const { value: stationName } = this.stationSelector;
    const { value: index } = this.orderInput;
    return { stationName, index };
  }

  updateOptions() {
    this.stationSelector.innerHTML = this.data.stationList
      .map((station) => optionTemplate(station))
      .join('');
  }

  setData(nextData) {
    this.data = {
      ...this.data,
      ...nextData,
    };
    this.updateOptions();
    this.render();
  }

  updateFormHeader() {
    const { name } = this.data.currentLineData;
    this.formHeader.innerHTML = `${name} 관리`;
  }

  updateTableBody() {
    this.table.innerHTML = this.data.currentLineData.section
      .map((station, index) =>
        sectionDetailTableTemplate({
          name: station,
          index,
          buttonClass: SECTION_SELECTOR.DELETE_BUTTON_CLASS,
        }),
      )
      .join('');
  }

  render() {
    this.updateFormHeader();
    this.updateTableBody();
  }
}
