import InnerSectionInput from "./InnerSectionInput.js";
import InnerSectionTable from "./InnerSectionTable.js";

import { ID } from "../../../utils/constants/dom.js";

class InnerSectionManager {
  constructor($target, { lineName, stationStore, lineStore }) {
    this.$target = $target;
    this.lineName = lineName;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>${this.lineName} 관리</p> 
      <div id=${ID.INNER_SECTION_INPUT}></div>
      <div id=${ID.INNER_SECTION_TABLE}></div>
    `;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#${ID.INNER_SECTION_INPUT}`);
    this.$table = this.$target.querySelector(`#${ID.INNER_SECTION_TABLE}`);
  }

  mountComponents() {
    new InnerSectionInput(this.$input, {
      lineName: this.lineName,
      stationStore: this.stationStore,
      lineStore: this.lineStore,
    });

    new InnerSectionTable(this.$table, {
      lineName: this.lineName,
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

export default InnerSectionManager;
