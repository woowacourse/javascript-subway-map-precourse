import { CLASS } from "../../utils/constants/dom.js";

class SectionList {
  constructor($target, { lineStore }) {
    this.$target = $target;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>구간을 수정할 노선을 선택해주세요.</p>
      ${this.createLineButtonsHTML(this.lineStore.getLineNames())}
    `;
  }

  createLineButtonsHTML(names) {
    return names.reduce((html, name) => {
      html += this.ButtonHTML(name);
      return html;
    }, ``);
  }

  ButtonHTML(name) {
    return `<button class=${CLASS.SECTION_LINE_MENU_BUTTON} data-name="${name}" style="margin-right: 4px;"}>${name}</button>`;
  }

  render = () => {
    this.mountTemplate();
  };
}

export default SectionList;
