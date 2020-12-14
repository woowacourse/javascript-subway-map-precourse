import { clearInput } from "../utils/domUtil.js";
import {
  SelectInnerHTML,
  LineHeaderHTML,
  LineRowHTML,
} from "../utils/templates/lineManager.js";
import { isSameStation, isValidLineName } from "../utils/validation.js";

class LineManager {
  constructor({ $target, stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.mountDOMs();
    this.bindEvents();

    this.renderSelect(this.stationStore.getStationNames());
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#line-name-input`);
    this.$startSelect = this.$target.querySelector(
      `#line-start-station-selector`,
    );
    this.$endSelect = this.$target.querySelector(`#line-end-station-selector`);
    this.$addButton = this.$target.querySelector(`#line-add-button`);
    this.$table = this.$target.querySelector(`#line-table`);
  }

  bindEvents() {
    this.$addButton.addEventListener(`click`, this.onClickAddButton.bind(this));
    this.$table.addEventListener(`click`, this.onClickDeleteButton.bind(this));
  }

  onClickAddButton({ target }) {
    if (target.id !== `line-add-button`) return;

    const name = this.$input.value.trim();
    const startName = this.$startSelect.value;
    const endName = this.$endSelect.value;

    if (
      !isValidLineName(this.$input, this.lineStore.getLineNames(), name) ||
      !isSameStation(startName, endName)
    ) {
      return;
    }

    clearInput(this.$input);
    this.lineStore.addLine(name, startName, endName);
    this.renderTable(this.lineStore.getLines());
  }

  onClickDeleteButton({ target }) {
    if (target.className !== `line-delte-button`) return;
  }

  renderSelect(names) {
    this.$startSelect.innerHTML = SelectInnerHTML(names);
    this.$endSelect.innerHTML = SelectInnerHTML(names);
  }

  renderTable(lines) {
    this.$table.innerHTML = lines.reduce((html, line) => {
      html += LineRowHTML(line.name, line.startName(), line.endName());
      return html;
    }, LineHeaderHTML());
  }

  render() {}
}

export default LineManager;

/*
지하철 노선의 이름을 입력하는 input 태그는 #line-name-input id값을 가진다.
지하철 노선의 상행 종점을 선택하는 select 태그는 #line-start-station-selector id값을 가진다.
지하철 노선의 하행 종점을 선택하는 select 태그는 #line-end-station-selector id값을 가진다.
지하철 노선을 추가하는 button 태그는 #line-add-button id값을 가진다.
지하철 노선을 삭제하는 button 태그는 .line-delete-button class값을 가진다.
*/
