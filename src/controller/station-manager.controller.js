import station from "../service/station.service.js";
import { createStationTableRowHTML } from "../common/template.js";
import { errorMessage } from "../common/error-message.js";
const { INVALID_LENGTH_STATION_NAME, DUPLICATE_STAION_NAME, CONFIRM_DELETE } = errorMessage;
export default class StationManager {
  constructor() {
    this.station = station;
    this.MIN_STATION_NAME_LENGTH = 2;
  }

  renderStationTable() {
    const allStations = this.station.getAllStations();

    const stationTableHTML = allStations.reduce((stationRowHTML, stationName) => {
      stationRowHTML += createStationTableRowHTML(stationName);
      return stationRowHTML;
    }, "");

    document.getElementById("station-table").querySelector("tbody").innerHTML = stationTableHTML;
  }

  getStationNameInput() {
    const stationNameInputField = document.getElementById("station-name-input"); //dom
    const stationName = stationNameInputField.value;

    return stationName;
  }

  resetStationNameInput() {
    const stationNameInputField = document.getElementById("station-name-input"); //dom
    stationNameInputField.value = "";
  }

  validateStationNameLength(stationName) {
    const isValidLength = stationName.length >= this.MIN_STATION_NAME_LENGTH;
    if (!isValidLength) {
      throw new Error(INVALID_LENGTH_STATION_NAME);
    }
  }

  validateStationNameUnique(stationName) {
    const isUnique = !this.station.hasSameName(stationName);
    if (!isUnique) {
      throw new Error(DUPLICATE_STAION_NAME);
    }
  }

  addStation() {
    const stationName = this.getStationNameInput();
    try {
      this.validateStationNameLength(stationName);
      this.validateStationNameUnique(stationName);

      this.station.createStation(stationName);
      this.renderStationTable();
      //
    } catch (error) {
      alert(error);
      this.resetStationNameInput();
    }
  }

  deleteStation(targetButton) {
    const targetRow = targetButton.parentNode.parentNode;
    const targetStation = targetRow.dataset.station;

    this.station.deleteStation(targetStation);
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === "station-add-button") {
      this.addStation();
    }
  }
}
