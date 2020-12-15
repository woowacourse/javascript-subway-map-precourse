import { clearInput } from "../../../../src_old/utils/domUtil.js";
import { isValidSectionNumber } from "../../../utils/validations/sectionValidation.js";
import { ID } from "../../../utils/constants/dom.js";

class InnerSectionInput {
  constructor($target, { lineName, stationStore, lineStore }) {
    this.$target = $target;
    this.lineName = lineName;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>구간 등록</p>
      <select id="${ID.SECTION_STATION_SELECT}">
      ${this.createOptionsHTML(this.stationStore.stations)}
      </select>
      <input type=number id="${ID.SECTION_ORDER_INPUT}" />
      <button id='${ID.SECTION_ADD_BUTTON}'>등록</button>    
    `;
  }

  createOptionsHTML(names) {
    return names.reduce((html, name) => {
      html += this.OptionHTML(name);
      return html;
    }, ``);
  }

  OptionHTML(name) {
    return `<option value=${name}>${name}</option>`;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#${ID.SECTION_ORDER_INPUT}`);
    this.$button = this.$target.querySelector(`#${ID.SECTION_ADD_BUTTON}`);
    this.$select = this.$target.querySelector(`#${ID.SECTION_STATION_SELECT}`);
  }

  bindEvents() {
    this.$button.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.id !== `${ID.SECTION_ADD_BUTTON}`) return;
    const order = parseInt(this.$input.value.trim());
    const sections = this.lineStore.getLine(this.lineName).sections;
    const name = this.$select.value;

    if (!isValidSectionNumber(this.$input, sections, name, order)) {
      return false;
    }

    clearInput(this.$input);
    this.lineStore.addSection(this.lineName, name, order);
  }

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
  };
}

export default InnerSectionInput;
