import { isValidStationManager } from "../../utils/validation.js";
export class StationManagerInput {
  constructor({ getStations, addNewStation }) {
    this.initializeDom();
    this.initializeEvents();
    this.getStations = getStations;
    this.addNewStation = addNewStation;
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
    this.addNewStation(stations);
  };

  initInputStatus = () => {
    this.stationNameInput.value = "";
  };
}
