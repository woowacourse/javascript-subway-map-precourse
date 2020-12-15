import {
  createSectionTableRowsHTML,
  SectionTableHeaderHTML,
} from "../../../utils/templates/sectionManagerTemplate.js";
import { MESSAGE } from "../../../utils/constants/message.js";
import { isRemovableSection } from "../../../utils/validations/sectionValidation.js";
import { CLASS } from "../../../utils/constants/dom.js";

class InnerSectionTable {
  constructor($target, { lineName, stationStore, lineStore }) {
    this.$target = $target;
    this.lineName = lineName;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.lineStore.subscribe(this.render);
    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    const line = this.lineStore.getLine(this.lineName);

    this.$target.innerHTML = `
      <table border="1" style="margin-top: 15px;">
        ${SectionTableHeaderHTML}
        ${createSectionTableRowsHTML(line ? line.sections : [])}
      </table>`;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (!target.classList.contains(`${CLASS.SECTION_DELETE_BUTTON}`)) return;
    const index = parseInt(
      target.closest(`tr`).firstElementChild.dataset.index,
    );
    const sections = this.lineStore.getLine(this.lineName).sections;

    if (!isRemovableSection(sections) || !confirm(MESSAGE.CONFIRM)) {
      return;
    }

    this.lineStore.removeSection(this.lineName, index);
  }

  render = () => {
    this.mountTemplate();
  };
}

export default InnerSectionTable;
