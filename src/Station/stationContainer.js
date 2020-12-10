import { displayAddedStation } from "./stationPresenter.js";
import { checkEmpty } from "../validation/index.js";

const stationAddClicked = () => {
  const stationInputValue = document.getElementById("station-name-input").value;

  const isEmpty = checkEmpty(stationInputValue);

  displayAddedStation(stationInputValue);
};

export const stationStart = () => {
  const stationAddButton = document.getElementById("station-add-button");

  stationAddButton.addEventListener("click", stationAddClicked);
};
