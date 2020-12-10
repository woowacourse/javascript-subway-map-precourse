import { displayAddedStation } from "./stationPresenter.js";
import { checkEmpty, checkLength } from "../validation/index.js";
import { checkTheList } from "../utils/message.js";

const stationAddClicked = () => {
  const stationInput = document.getElementById("station-name-input");
  const stationInputValue = stationInput.value;

  const isEmpty = checkEmpty(stationInputValue);
  const isTooShort = checkLength(stationInputValue);
  const checkList = { isEmpty, isTooShort };
  const isValid = checkTheList(checkList, stationInput);

  if (isValid) {
    displayAddedStation(stationInputValue);
  }
};

export const stationStart = () => {
  const stationAddButton = document.getElementById("station-add-button");

  stationAddButton.addEventListener("click", stationAddClicked);
};
