import station from "./station.js";
import { createStationTableRowHTML } from "./template.js";
import { errorMessage } from "./error-message.js";
const { INVALID_LENGTH_STATION_NAME, DUPLICATE_STAION_NAME } = errorMessage;
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

  validateStationNameLength(stationName) {
    const isValidLength = stationName.length >= this.MIN_STATION_NAME_LENGTH;

    if (!isValidLength) {
      throw new Error(INVALID_LENGTH_STATION_NAME);
    }
  }

  addStation() {
    const stationName = this.getStationNameInput();

    try {
      this.validateStationNameLength(stationName);
    } catch (errorMessage) {
      alert(errorMessage);
    }

    //등록
    //뷰추가
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === "station-add-button") {
      this.addStation();
    }
  }
}
