import { isValid } from "../../utils/validation.js";
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
    if (!isValid(stationName)) {
      return;
    }
    this.setStationNames();
    console.log(this.getStationNames());
    //add name in local storage
  };
}
