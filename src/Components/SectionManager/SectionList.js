import { createLineButtonsHTML } from "../../utils/templates/sectionManagerTemplate.js";

class SectionList {
  constructor($target, { lineStore }) {
    this.$target = $target;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>구간을 수정할 노선을 선택해주세요.</p>
      ${createLineButtonsHTML(this.lineStore.getLineNames())}
    `;
  }

  render = () => {
    this.mountTemplate();
  };
}

export default SectionList;
