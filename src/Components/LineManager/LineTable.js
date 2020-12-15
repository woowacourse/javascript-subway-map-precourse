import {
  createLineTableRowsHTML,
  LineTableHeaderHTML,
} from "../../utils/templates/lineManagerTemplate.js";
import { CLASS } from "../../utils/constants/dom.js";
import { MESSAGE } from "../../utils/constants/message.js";

class LineTable {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.lineStore.subscribe(this.render);

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <h3>🚉 지하철 노선 목록</h3>
      <table border="1">
        ${LineTableHeaderHTML}
        ${createLineTableRowsHTML(this.lineStore.lines)}
      </table>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (!target.classList.contains(`${CLASS.LINE_DELETE_BUTTON}`)) return;
    const name = target.closest(`tr`).firstElementChild.dataset.name;

    if (!confirm(MESSAGE.CONFIRM)) return;
    this.lineStore.removeLine(name);
  }

  render = () => {
    this.mountTemplate();
  };
}

export default LineTable;
