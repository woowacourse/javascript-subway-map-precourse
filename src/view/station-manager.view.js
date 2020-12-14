import station from "../service/station.service.js";
import { stationManagerViewHTML, createStationTableRowHTML } from "./template.view.js";

export default class StationManagerView {
  constructor(parentView) {
    this.parentView = parentView;

    this.station = station;
  }

  renderStationTable() {
    const allStations = this.station.getAllStations();

    const stationTableHTML = allStations.reduce((stationRowHTML, stationName) => {
      stationRowHTML += createStationTableRowHTML(stationName);
      return stationRowHTML;
    }, "");

    document.getElementById("station-table").querySelector("tbody").innerHTML = stationTableHTML;
  }

  renderStationManagerView() {
    this.parentView.innerHTML = stationManagerViewHTML;

    this.renderStationTable();
  }

  accessStationNameInputField() {
    return document.getElementById(`station-name-input`);
  }

  resetStationNameInputField() {
    const stationNameInputField = this.accessStationNameInputField();
    stationNameInputField.value = "";
  }
}
