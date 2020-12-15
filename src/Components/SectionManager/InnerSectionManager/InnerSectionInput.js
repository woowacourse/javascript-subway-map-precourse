import { clearInput } from "../../../../src_old/utils/domUtil.js";
import { isValidSectionNumber } from "../../../utils/validations/sectionValidation.js";

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
      <select id="section-station-selector">
      ${this.createOptionsHTML(this.stationStore.stations)}
      </select>
      <input type=number id="section-order-input" />
      <button id='section-add-button'>등록</button>    
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
    this.$input = this.$target.querySelector(`#section-order-input`);
    this.$button = this.$target.querySelector(`#section-add-button`);
    this.$select = this.$target.querySelector(`#section-station-selector`);
  }

  bindEvents() {
    this.$button.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.id !== "section-add-button") return;
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
