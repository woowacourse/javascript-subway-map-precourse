import { isValidStationName, inLine } from "../utils";
import { stationListTemplate } from "./stationPresenter";
import { INVALID_STATION_NAME, CANNOT_REMOVE } from "./stationConstant";

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
    stationListTemplate(stationList);
    removeStationHandler();
  };

  const removeStationHandler = () => {
    const stationRemoveButton = document.querySelectorAll(
      "#station-remove-button",
    );
    if (stationRemoveButton !== null) {
      for (const removeButton of stationRemoveButton) {
        removeButton.addEventListener("click", event => {
          removeStation(event);
        });
      }
    }
  };

  const removeStation = event => {
    const targetStation = event.target.parentNode.parentNode;
    const stationName = targetStation.dataset.stationname;
    const stationIndex = stationList.indexOf(stationName);

    if (!inLine(stationName)) {
      stationList.splice(stationIndex, 1);
      setLocalData(stationList);
      stationListTemplate(stationList);
      removeStationHandler();
    } else {
      alert(CANNOT_REMOVE);
    }
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
    stationListTemplate(stationList);
    removeStationHandler();
    stationContainer.style.display = "block";
    submitButton.addEventListener("click", () => {
      checkStationName(stationNameInput.value);
      stationNameInput.value = "";
    });
  };

  init();
}
