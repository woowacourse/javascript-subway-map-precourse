import subwayStore from "../models/SubwayStore.js";
import {
  TableHeaderHTML,
  TableRow,
} from "../utils/templates/stationManager.js";

class StationManager {
  constructor({ $target }) {
    this.$target = $target;

    this.mountDOMs();
    this.bindEvents();
    this.render(subwayStore.getStations());
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#station-name-input`);
    this.$addButton = this.$target.querySelector(`#station-add-button`);
    this.$table = this.$target.querySelector(`#station-table`);
  }

  bindEvents() {
    this.$addButton.addEventListener("click", this.onClickAddButton.bind(this));
    this.$table.addEventListener("click", this.onClickDeleteButton.bind(this));
  }

  onClickAddButton({ target }) {}

  onClickDeleteButton({ target }) {}

  render(stations) {
    this.$table.innerHTML = stations.reduce((html, station) => {
      html += TableRow(station.name);
      return html;
    }, TableHeaderHTML());
  }
}

export default StationManager;

/*
  STATION_NAME_INPUT: `station-name-input`,
  STATION_ADD_BUTTON: `station-add-button`,
  STATION_DELETE_BUTTON: `station-delete-button`,
*/
