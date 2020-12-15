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
    setLocalData(stationList);
  };

  const setLocalData = stationList => {
    window.localStorage.setItem("stationList", JSON.stringify(stationList));
  };

  const getLocalData = () => {
    let localData = window.localStorage.getItem("stationList");

    if (!localData) {
      localData = [];
      window.localStorage.setItem("stationList", JSON.stringify(localData));
    } else {
      stationList = JSON.parse(localData);
    }
  };

  const init = () => {
    const stationContainer = document.querySelector(
      "#station-manager-container",
    );
    const submitButton = document.querySelector("#station-name-button");
    const stationNameInput = document.querySelector("#station-name-input");

    getLocalData();
    stationContainer.style.display = "block";
    submitButton.addEventListener("click", () => {
      checkStationName(stationNameInput.value);
      stationNameInput.value = "";
    });
  };

  init();
}
