import { isValidStationManager } from "../../utils/validation.js";

export class StationManagerInput {
  constructor({ getStations, setStations }) {
    this.initializeDom();
    this.initializeEvents();
    this.getStations = getStations;
    this.setStations = setStations;
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
    let stations = this.getStations();

    this.initInputStatus();
    if (!isValidStationManager(stationName, stations)) {
      return;
    }
    stations.push(stationName);
    this.setStations(stations);
  };

  initInputStatus = () => {
    this.stationNameInput.value = "";
  };
}
