import {
  displayAddedStation,
  removeDisplayStation,
} from "./stationPresenter.js";
import { checkEmpty, checkLength } from "../validation/index.js";
import { checkTheList } from "../utils/message.js";
import { KEY } from "../constants/index.js";

const saveStations = (stationArray) =>
  localStorage.setItem(KEY.STATION, JSON.stringify(stationArray));

const loadStations = () => JSON.parse(localStorage.getItem(KEY.STATION));

const addStation = (stationName) => {
  const stations = loadStations() || [];

  stations.push(stationName);

  saveStations(stations);
};

const removeStation = (event) => {
  removeDisplayStation(event);
};

const activateRemoveStation = () => {
  const stationRemoveButton = document.getElementsByClassName(
    "station-delete-button"
  );

  for (let i = 0; i < stationRemoveButton.length; i++) {
    stationRemoveButton[i].addEventListener("click", removeStation);
  }
};

const stationAddClicked = () => {
  const stationInput = document.getElementById("station-name-input");
  const stationInputValue = stationInput.value;

  const isEmpty = checkEmpty(stationInputValue);
  const isTooShort = checkLength(stationInputValue);
  const checkList = { isEmpty, isTooShort };
  const isValid = checkTheList(checkList, stationInput);

  if (isValid) {
    displayAddedStation(stationInputValue);
    addStation(stationInputValue);
    activateRemoveStation();
  }
};

const initialTable = () => {
  const stations = loadStations();

  if (stations) {
    stations.forEach((station) => displayAddedStation(station));
    activateRemoveStation();
  }
};

export const stationStart = () => {
  const stationAddButton = document.getElementById("station-add-button");

  stationAddButton.addEventListener("click", stationAddClicked);

  initialTable();
};
