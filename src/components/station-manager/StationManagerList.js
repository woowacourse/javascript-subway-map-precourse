import { addRow, getStationsTableHeader } from "../../utils/handleDom.js";
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

    this.stations.forEach((station, index) => {
      addRow(this.stationTable, station, index);
    });
  };

  handleDeleteStation = (e) => {
    console.log("dsfs");
    if (e.target.classList.contains("delete-button")) {
      console.log(e.target.dataset.station);
      this.deleteStation(e.target.dataset.station);
      this.render();
    }
  };
}
