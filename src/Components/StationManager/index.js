import StationInput from "./StationInput.js";
import StationTable from "./StationTable.js";

import { ID } from "../../utils/constants/dom.js";

class StationManager {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;

    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div id=${ID.STATION_INPUT}></div>
      <div id=${ID.STATION_TABLE}></div>
    `;
  }

  mountDOMs() {
    this.$stationInput = this.$target.querySelector(`#${ID.STATION_INPUT}`);
    this.$stationTable = this.$target.querySelector(`#${ID.STATION_TABLE}`);
  }

  mountComponents() {
    new StationInput(this.$stationInput, { stationStore: this.stationStore });
    new StationTable(this.$stationTable, {
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

export default StationManager;
