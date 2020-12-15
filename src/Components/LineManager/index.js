import LineInput from "./LineInput.js";
import LineTable from "./LineTable.js";

import { ID } from "../../utils/constants/dom.js";

class LineManager {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div id=${ID.LINE_INPUT}></div>
      <div id=${ID.LINE_TABLE}></div>
    `;
  }

  mountDOMs() {
    this.$lineInput = this.$target.querySelector(`#${ID.LINE_INPUT}`);
    this.$lineTable = this.$target.querySelector(`#${ID.LINE_TABLE}`);
  }

  mountComponents() {
    new LineInput(this.$lineInput, {
      stationStore: this.stationStore,
      lineStore: this.lineStore,
    });
    new LineTable(this.$lineTable, {
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

export default LineManager;
