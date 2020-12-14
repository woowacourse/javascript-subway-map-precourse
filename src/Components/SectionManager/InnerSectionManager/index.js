import InnerSectionInput from "./InnerSectionInput.js";
import InnerSectionTable from "./InnerSectionTable.js";

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
      <div id="inner-section-input"></div>
      <div id="inner-section-table"></div>
    `;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#inner-section-input`);
    this.$table = this.$target.querySelector(`#inner-section-table`);
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
