import inputStationValidator from "../utils/inputs/validator/validator.js";
import Station from "../domain/station.js";
import clearInput from "../utils/inputs/clear-input.js";
import { STATION_ARRAY_KEY } from "../global/constant.js";
import { makeOneRowWithDeleteBtn } from "../utils/display/make-elements.js";

const STATION_TBODY_ID = "stations";
const addStationBtn = document.getElementById("station-add-button");
const stationNameInput = document.getElementById("station-name-input");

function initStationManagement(state) {
  for (const station of state.stationArray) {
    showNewRow(STATION_TBODY_ID, station);
  }
}

function showNewRow(parentID, rowToShow) {
  const oneRow = makeOneRowWithDeleteBtn(rowToShow);
  const locationOfRow = document.getElementById(parentID);

  return locationOfRow.insertAdjacentHTML("beforeend", oneRow);
}

export default function stationManageContainer(state) {
  initStationManagement(state);

  addStationBtn.addEventListener("click", () => {
    const stationNameInputValue = stationNameInput.value.trim();

    if (inputStationValidator(stationNameInputValue)) {
      const station = new Station(stationNameInputValue);
      state.stationArray.push(station);

      showNewRow(STATION_TBODY_ID, station);

      // TODO - 로컬 스토리지 저장은 마지막에 한 번만 할 수 있도록 하는 것도 좋을 것 같다.
      localStorage.setItem(
        STATION_ARRAY_KEY,
        JSON.stringify(state.stationArray)
      );
      clearInput(stationNameInput);
    } else {
      clearInput(stationNameInput);
    }
  });
}
