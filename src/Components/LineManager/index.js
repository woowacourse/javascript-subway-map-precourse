import LineInput from "./LineInput.js";
import LineTable from "./LineTable.js";

class LineManager {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div id="line-input"></div>
      <div id="line-table"></div>
    `;
  }

  mountDOMs() {
    this.$lineInput = this.$target.querySelector(`#line-input`);
    this.$lineTable = this.$target.querySelector(`#line-table`);
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
