import InnerSectionManager from "./InnerSectionManager/index.js";
import SectionList from "./SectionList.js";

import { CLASS, ID } from "../../utils/constants/dom.js";

class SectionManager {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div id=${ID.SECTION_LIST}></div>
      <div id=${ID.INNER_SECTION_MANAGER}></div>
    `;
  }

  mountDOMs() {
    this.$sectionList = this.$target.querySelector(`#${ID.SECTION_LIST}`);
    this.$innerSectionManager = this.$target.querySelector(
      `#${ID.INNER_SECTION_MANAGER}`,
    );
  }

  mountComponents() {
    new SectionList(this.$sectionList, { lineStore: this.lineStore });
  }

  bindEvents() {
    this.$sectionList.addEventListener(`click`, this.onClickLine.bind(this));
  }

  onClickLine({ target }) {
    if (!target.classList.contains(`${CLASS.SECTION_LINE_MENU_BUTTON}`)) return;
    const name = target.dataset.name;

    new InnerSectionManager(this.$innerSectionManager, {
      lineName: name,
      stationStore: this.stationStore,
      lineStore: this.lineStore,
    });
  }

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
    this.mountComponents();
  };
}

export default SectionManager;
