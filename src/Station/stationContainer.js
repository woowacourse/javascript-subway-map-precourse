import {
  displayAddedStation,
  removeDisplayStation,
} from "./stationPresenter.js";
import {
  checkDuplicateStation,
  checkEmpty,
  checkInSection,
  checkLength,
} from "../validation/index.js";
import { checkStationList, confirmDelete } from "../utils/message.js";
import { KEY, MESSAGE } from "../constants/index.js";

const saveStations = (stationArray) =>
  localStorage.setItem(KEY.STATION, JSON.stringify(stationArray));

const clearStations = () => localStorage.removeItem(KEY.STATION);

export const loadStations = () => JSON.parse(localStorage.getItem(KEY.STATION));

const addStation = (stationName) => {
  const stations = loadStations() || [];

  stations.push(stationName);

  saveStations(stations);
};

const removeStation = (event) => {
  const {
    target: {
      parentNode: { parentNode },
    },
  } = event;
  const targetStation = parentNode.childNodes[0].innerText;
  const currentStations = loadStations();

  const filteredStations = currentStations.filter(
    (station) => station !== targetStation
  );
  const isInSection = checkInSection(targetStation);

  if (isInSection) {
    alert(MESSAGE.IS_IN_LINE);
  } else {
    clearStations();
    saveStations(filteredStations);
    removeDisplayStation(event);
  }
};

const stationRemoveClicked = (event) => {
  const isDelete = confirmDelete();

  if (isDelete) {
    removeStation(event);
  }
};

const activateRemoveStation = () => {
  const stationRemoveButton = document.getElementsByClassName(
    "station-delete-button"
  );

  for (let i = 0; i < stationRemoveButton.length; i++) {
    stationRemoveButton[i].addEventListener("click", stationRemoveClicked);
  }
};

const stationAddClicked = () => {
  const stationInput = document.getElementById("station-name-input");
  const stationInputValue = stationInput.value;

  const isEmpty = checkEmpty(stationInputValue);
  const isTooShort = checkLength(stationInputValue);
  const isDuplicate = checkDuplicateStation(stationInputValue);
  const checkList = { isEmpty, isTooShort, isDuplicate };
  const isValid = checkStationList(checkList, stationInput);

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
