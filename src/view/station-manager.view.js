import station from "../service/station.service.js";
import StationManagerTemplate from "./template/station-manager-template.js";

export default class StationManagerView extends StationManagerTemplate {
  constructor(parentView) {
    super();
    this.parentView = parentView;

    this.station = station;
  }

  renderStationTable() {
    const allStations = this.station.getAllStations();

    const stationTableHTML = allStations.reduce((stationRowHTML, stationName) => {
      stationRowHTML += this.createStationTableRowHTML(stationName);
      return stationRowHTML;
    }, "");

    document
      .getElementById(this.STATION_TABLE_ID)
      .querySelector("tbody").innerHTML = stationTableHTML;
  }

  renderStationManagerView() {
    this.parentView.innerHTML = this.createStationManagerViewHTML();
    this.renderStationTable();
  }

  accessStationNameInputField() {
    return document.getElementById(this.STATION_NAME_INPUT_ID);
  }

  resetStationNameInputField() {
    const stationNameInputField = this.accessStationNameInputField();
    stationNameInputField.value = "";
  }
}
