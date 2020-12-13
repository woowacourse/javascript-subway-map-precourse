import Station from "../domain/station.js";
import inputStationValidator from "../utils/inputs/validator/station-name-validator.js";
import clearInput from "../utils/inputs/clear-input.js";
import makeOneRowWithDeleteBtn from "../utils/display/make-elements.js";
import { saveToLocalStorage } from "../index.js";
import { STATION_ARRAY_KEY } from "../global/constant.js";

const STATION_TBODY_ID = "stations";

function loadStations(state) {
  for (const station of state.stationArray) {
    showNewRow(STATION_TBODY_ID, station);
  }
}

function showNewRow(parentID, rowToShow) {
  const oneRowWithDeleteBtn = makeOneRowWithDeleteBtn(rowToShow);
  const locationOfRow = document.getElementById(parentID);

  return locationOfRow.appendChild(oneRowWithDeleteBtn);
}

export default function stationManageContainer(state) {
  const addStationBtn = document.getElementById("station-add-button");
  const stationNameInput = document.getElementById("station-name-input");

  loadStations(state);

  addStationBtn.addEventListener("click", () => {
    const stationNameInputValue = stationNameInput.value.trim();

    if (inputStationValidator(stationNameInputValue)) {
      let stationId = 0;

      if (state.stationArray.length === 0) {
        stationId = 0;
      } else {
        stationId = state.stationArray[state.stationArray.length - 1].id + 1;
      }

      const station = new Station(stationNameInputValue, stationId);

      showNewRow(STATION_TBODY_ID, station);
      state.stationArray.push(station);
      saveToLocalStorage(STATION_ARRAY_KEY, JSON.stringify(state.stationArray));
      clearInput(stationNameInput);
    } else {
      clearInput(stationNameInput);
    }
  });
}
