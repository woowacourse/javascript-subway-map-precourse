import station from "../service/station.service.js";
import section from "../service/section.service.js";
import { errorMessage } from "../common/error-message.js";
const {
  INVALID_LENGTH_STATION_NAME,
  DUPLICATE_STAION_NAME,
  CONFIRM_DELETE,
  INVALID_DELETE_STATION_IN_LINE,
} = errorMessage;
export default class StationManager {
  constructor(view) {
    this.station = station;
    this.section = section;
    this.view = view;

    this.MIN_STATION_NAME_LENGTH = 2;
  }

  getStationNameInput() {
    const stationNameInputField = this.view.accessStationNameInputField();
    return stationNameInputField.value;
  }

  validateStationNameLength(stationName) {
    const isValidLength = stationName.length >= this.MIN_STATION_NAME_LENGTH;

    if (!isValidLength) {
      throw new Error(INVALID_LENGTH_STATION_NAME);
    }
  }

  validateStationNameUnique(stationName) {
    const isExistStation = !this.station.findStationByName(stationName).length;

    if (!isExistStation) {
      throw new Error(DUPLICATE_STAION_NAME);
    }
  }

  addStation() {
    try {
      const stationName = this.getStationNameInput();
      this.view.resetStationNameInputField();

      this.validateStationNameLength(stationName);
      this.validateStationNameUnique(stationName);

      this.station.createStation(stationName);
      this.view.renderStationTable();
    } catch (error) {
      alert(error);
    }
  }

  validateDeleteStationInLine(stationName) {
    const isStationInLine = this.section.findSectionByStationName(stationName).length;

    if (isStationInLine) {
      throw new Error(INVALID_DELETE_STATION_IN_LINE);
    }
  }

  deleteStation(targetButton) {
    const targetRow = targetButton.parentNode.parentNode;
    const targetStation = targetRow.dataset.station;

    try {
      this.validateDeleteStationInLine(targetStation);
      this.station.deleteStation(targetStation);
      this.view.renderStationTable();
    } catch (error) {
      alert(error);
    }
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === "station-add-button") {
      this.addStation();
    }

    if (target.className === "station-delete-button") {
      if (confirm(CONFIRM_DELETE)) {
        this.deleteStation(target);
      }
    }
  }
}
