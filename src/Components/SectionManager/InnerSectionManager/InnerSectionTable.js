import { MESSAGE } from "../../../utils/constants/message.js";
import { isRemovableSection } from "../../../utils/validations/sectionValidation.js";

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
    this.$target.innerHTML = `
      <table border="1" style="margin-top: 15px;">
        <tr>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </tr>
        ${this.createTableRowsHTML(
          this.lineStore.getLine(this.lineName)
            ? this.lineStore.getLine(this.lineName).sections
            : [],
        )}
      </table>`;
  }

  createTableRowsHTML(sections) {
    return sections.reduce((html, station, idx) => {
      html += this.TableRowHTML(idx, station);
      return html;
    }, ``);
  }

  TableRowHTML(idx, station) {
    return `
      <tr>
        <td data-index=${idx}>${idx}</td>
        <td data-name=${station}>${station}</td>
        <td><button class="section-delete-button">노선에서 제거</button></td>
      </tr>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (!target.classList.contains(`section-delete-button`)) return;
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
