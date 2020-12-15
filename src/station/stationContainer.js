import { isValidStationName } from "../utils";
import { INVALID_STATION_NAME } from "./stationConstant";

export default function stationContainer() {
  let stationList = [];

  const checkStationName = stationName => {
    isValidStationName(stationList, stationName)
      ? addStation(stationName)
      : alert(INVALID_STATION_NAME);
  };

  const addStation = stationName => {
    stationList.push(stationName);
    console.log(stationList);
  };

  const init = () => {
    const stationContainer = document.querySelector(
      "#station-manager-container",
    );
    const submitButton = document.querySelector("#station-name-button");
    const stationNameInput = document.querySelector("#station-name-input");

    stationContainer.style.display = "block";
    submitButton.addEventListener("click", () => {
      checkStationName(stationNameInput.value);
      stationNameInput.value = "";
    });
  };

  init();
}
