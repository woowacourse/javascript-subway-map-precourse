import { isRemovableStation } from "../../utils/validations/stationValidation.js";

import { MESSAGE } from "../../utils/constants/message.js";
import { CLASS } from "../../utils/constants/dom.js";

class StationTable {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.stationStore.subscribe(this.render);

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <h3>🚉 지하철 역 목록</h3>
      <table border="1">
        <tr>
          <th>역 이름</th>
          <th>설정</th>
        </tr>
        ${this.createTableRowsHTML(this.stationStore.stations)}
      </table>
    `;
  }

  createTableRowsHTML(names) {
    return names.reduce((html, name) => {
      html += this.TableRowHTML(name);
      return html;
    }, ``);
  }

  TableRowHTML(name) {
    return `
    <tr>
      <td data-name="${name}">${name}</td>
      <td ><button class=${CLASS.STATION_DELETE_BUTTON}>삭제</button></td>
    </tr>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (!target.classList.contains(CLASS.STATION_DELETE_BUTTON)) return;
    const name = target.closest(`tr`).firstElementChild.dataset.name;

    if (
      !isRemovableStation(this.lineStore.lines, name) ||
      !confirm(MESSAGE.CONFIRM)
    ) {
      return;
    }

    this.stationStore.removeStation(name);
  }

  render = () => {
    this.mountTemplate();
  };
}

export default StationTable;
