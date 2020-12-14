import InnerSectionManager from "./InnerSectionManager/index.js";
import SectionList from "./SectionList.js";

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
      <div id="section-list"></div>
      <div id="inner-section-manager"></div>
    `;
  }

  mountDOMs() {
    this.$sectionList = this.$target.querySelector(`#section-list`);
    this.$innerSectionManager = this.$target.querySelector(
      `#inner-section-manager`,
    );
  }

  mountComponents() {
    new SectionList(this.$sectionList, { lineStore: this.lineStore });
  }

  bindEvents() {
    this.$sectionList.addEventListener(`click`, this.onClickLine.bind(this));
  }

  onClickLine({ target }) {
    if (!target.classList.contains(`section-line-menu-button`)) return;
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
