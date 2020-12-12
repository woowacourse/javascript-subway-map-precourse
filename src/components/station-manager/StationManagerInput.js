import { isValidStationManager } from "../../utils/validation.js";
export class StationManagerInput {
  constructor({ setStationNames, getStationNames }) {
    this.initializeDom();
    this.initializeEvents();
    this.setStationNames = setStationNames;
    this.getStationNames = getStationNames;
  }

  initializeDom = () => {
    this.stationNameInput = document.getElementById("station-name-input");
    this.stationAddButton = document.getElementById("station-add-button");
  };

  initializeEvents = () => {
    this.stationAddButton.addEventListener("click", this.handleStationInput);
  };

  handleStationInput = () => {
    let stationName = this.stationNameInput.value;
    let stations = this.getStationNames();

    this.removeInputs();
    if (!isValidStationManager(stationName, stations)) {
      return;
    }
    stations.push(stationName);
    this.setStationNames(stations);
  };

  removeInputs = () => {
    this.stationNameInput.value = "";
  };
}
