import {
  addRowInStationTable,
  getStationsTableHeader,
} from "../../utils/handleDom.js";
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
      addRowInStationTable(this.stationTable, station);
    });
  };

  handleDeleteStation = (e) => {
    if (e.target.classList.contains("delete-button")) {
      let confirmDelete = confirm("정말로 삭제하시겠습니까?");
      if (confirmDelete) {
        this.deleteStation(e.target.dataset.station);
        this.render();
      }
    }
  };
}
