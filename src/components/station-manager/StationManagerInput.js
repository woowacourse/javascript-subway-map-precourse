import { isValid } from "../../utils/validation.js";
export class StationManagerInput {
  constructor() {
    this.initializeDom();
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
    //add name in local storage
  };
}
