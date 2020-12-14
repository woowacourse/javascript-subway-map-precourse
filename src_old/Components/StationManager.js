import { clearInput } from "../utils/domUtil.js";
import {
  TableHeaderHTML,
  TableRow,
} from "../utils/templates/stationManager.js";
import { isRemovableStation, isVaildStationName } from "../utils/validation.js";

class StationManager {
  constructor({ $target, stationStore }) {
    this.$target = $target;
    this.stationStore = stationStore;

    this.mountDOMs();
    this.bindEvents();
    this.render(this.stationStore.getStations());
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

  onClickAddButton({ target }) {
    if (target.id !== `station-add-button`) return;

    const name = this.$input.value.trim();
    if (
      !isVaildStationName(
        this.$input,
        this.stationStore.getStationNames(),
        name,
      )
    ) {
      return;
    }

    clearInput(this.$input);

    this.stationStore.addStation(name);
    this.render(this.stationStore.getStations());
  }

  onClickDeleteButton({ target }) {
    if (target.className !== `station-delete-button`) return;

    const name = target.closest("tr").firstElementChild.dataset.name;
    if (!isRemovableStation(this.stationStore.getStation(name))) {
      return;
    }

    this.stationStore.removeStation(name);
    this.render(this.stationStore.getStations());
  }

  render(stations) {
    this.$table.innerHTML = stations.reduce((html, station) => {
      html += TableRow(station.name);
      return html;
    }, TableHeaderHTML());
  }
}

export default StationManager;
