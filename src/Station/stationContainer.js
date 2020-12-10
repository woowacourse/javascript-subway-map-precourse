import { displayAddedStation } from "./stationPresenter.js";

const stationAddClicked = () => {
  const stationInputValue = document.getElementById("station-name-input").value;

  displayAddedStation(stationInputValue);
};

export const stationStart = () => {
  const stationAddButton = document.getElementById("station-add-button");

  stationAddButton.addEventListener("click", stationAddClicked);
};
