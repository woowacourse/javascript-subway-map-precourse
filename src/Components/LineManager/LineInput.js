import { ID } from "../../utils/constants/dom.js";
import { clearInput } from "../../utils/domUtil.js";
import {
  isSameStation,
  isValidLineName,
} from "../../utils/validations/lineValidation.js";

class LineInput {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>노선 이름</p>
      <Input id=${ID.LINE_NAME_INPUT} placeholder="노선 이름을 입력해주세요."/>
      <div>
        <span>상행 종점</span>
        <select id=${ID.LINE_START_SELECT}>
        ${this.createOptionsHTML(this.stationStore.stations)}
        </select>
        </div>
        <div>
        <span>하행 종점</span>
        <select id=${ID.LINE_END_SELECT}>
        ${this.createOptionsHTML(this.stationStore.stations)}
        </select>
      </div>
      <button id=${ID.LINE_ADD_BUTTON}>노선 추가</button>
    `;
  }

  createOptionsHTML(stations) {
    return stations.reduce((html, station) => {
      html += this.OptionHTML(station);
      return html;
    }, ``);
  }

  OptionHTML(name) {
    return `
      <option value=${name}>${name}</option>
    `;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#${ID.LINE_NAME_INPUT}`);
    this.$startSelect = this.$target.querySelector(`#${ID.LINE_START_SELECT}`);
    this.$endSelect = this.$target.querySelector(`#${ID.LINE_END_SELECT}`);
    this.$button = this.$target.querySelector(`#${ID.LINE_ADD_BUTTON}`);
  }

  bindEvents() {
    this.$button.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.id !== `${ID.LINE_ADD_BUTTON}`) return;
    const name = this.$input.value.trim();
    const startStation = this.$startSelect.value;
    const endStation = this.$endSelect.value;

    if (
      !isValidLineName(this.$input, this.lineStore.getLineNames(), name) ||
      !isSameStation(startStation, endStation)
    ) {
      return;
    }

    clearInput(this.$input);
    this.lineStore.addLine(name, startStation, endStation);
  }

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
  };
}

export default LineInput;
