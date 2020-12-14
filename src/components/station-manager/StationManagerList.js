import { addRowInStationTable } from "../../utils/handleDom.js";
import { getStationsTableHeader } from "../../utils/templates.js";
import { MESSAGE, FIELD } from "../../constants/constants.js";
import { isInvolvedInLine } from "../../utils/validation.js";

export class StationManagerList {
  constructor({ getStations, deleteStation, getLines }) {
    this.getStations = getStations;
    this.deleteStation = deleteStation;
    this.getLines = getLines;
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
    let lines = this.getLines();
    let confirmDelete = confirm(MESSAGE.DELETE_DOUBLE_CHECK);

    if (confirmDelete) {
      let station = e.target.dataset.station;

      if (!isInvolvedInLine(lines, station)) {
        this.deleteStation(station);
        this.render();
      }
    }
  };
}
