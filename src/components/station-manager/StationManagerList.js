import { addRow } from "../../utils/handleDom.js";
export class StationManagerList {
  constructor({ getStationNames }) {
    this.initializeDOM();
    this.getStationNames = getStationNames;
    this.render();
  }

  initializeDOM = () => {
    this.stationTable = document.getElementById("station-table");
  };

  render = () => {
    this.stations = this.getStationNames();

    this.stations.forEach((station, index) => {
      addRow(this.stationTable, station, index);
    });
  };
}
