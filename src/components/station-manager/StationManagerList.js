import { addRowInStationTable } from "../../utils/handleDom.js";
import { getStationsTableHeader } from "../../utils/templates.js";
import { MESSAGE, FIELD } from "../../constants/constants.js";

export class StationManagerList {
  constructor({ getStations, deleteStation }) {
    this.getStations = getStations;
    this.deleteStation = deleteStation;
    this.initializeDOM();
    this.initializeEvents();
    this.render();
  }

  initializeDOM = () => {
    this.stationTable = document.getElementById("station-table");
  };

  initializeEvents = () => {
    document
      .querySelector("#station-table")
      .addEventListener("click", this.handleDeleteStation);
  };

  render = () => {
    this.stationTable.innerHTML = getStationsTableHeader();
    this.stations = this.getStations();

    this.stations.forEach((station) => {
      addRowInStationTable(this.stationTable, station, FIELD.STATION);
    });
  };

  handleDeleteStation = (e) => {
    if (e.target.classList.contains("delete-button")) {
      let confirmDelete = confirm(MESSAGE.DELETE_DOUBLE_CHECK);
      if (confirmDelete) {
        this.deleteStation(e.target.dataset.station);
        this.render();
      }
    }
  };
}
