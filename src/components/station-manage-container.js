import Station from "../domain/station.js";
import inputNameValidator from "../utils/inputs/validator/name-validator.js";
import clearInput from "../utils/inputs/clear-input.js";
import { saveToLocalStorage } from "../index.js";
import { showNewRow } from "../utils/display/make-elements.js";
import { STATION_ARRAY_KEY, STATION_TAGS } from "../global/constant.js";

const VALIDATION_TYPE = "STATION";

function loadStations(state) {
  for (const station of state.stationArray) {
    showNewRow(STATION_TAGS.STATION_TBODY_ID, station, [station.stationName]);
  }
}

function makeStationId(stationArray) {
  let stationId = 0;

  if (stationArray.length !== 0) {
    stationId = stationArray[stationArray.length - 1].id + 1;
  }

  return stationId;
}

function makeNewStation(stationArray, stationNameInputValue) {
  const stationId = makeStationId(stationArray);
  const station = new Station(stationNameInputValue, stationId);

  showNewRow(STATION_TAGS.STATION_TBODY_ID, station, [station.stationName]);
  stationArray.push(station);
  saveToLocalStorage(STATION_ARRAY_KEY, JSON.stringify(stationArray));
}

export default function stationManageContainer(state) {
  const addStationButton = document.getElementById(STATION_TAGS.ADD_BUTTON_ID);
  const stationNameInput = document.getElementById(STATION_TAGS.STATION_NAME_INPUT_ID);

  loadStations(state);
  addStationButton.addEventListener("click", () => {
    const stationNameInputValue = stationNameInput.value.trim();

    if (inputNameValidator(VALIDATION_TYPE, stationNameInputValue)) {
      makeNewStation(state.stationArray, stationNameInputValue);
      clearInput(stationNameInput);
    } else {
      clearInput(stationNameInput);
    }
  });
}
