import Station from "./models.js";
import { isNull, isUnderTwo, isDuplication, isZero } from "../utils.js";
import { printLayout, createStationList } from "./templates.js";

const stationManagerBtn = document.getElementById("station-manager-button");

const loadStations = () => {
  return JSON.parse(stationManagerBtn.dataset.stations);
};

const saveStations = (_stations) => {
  stationManagerBtn.dataset.stations = JSON.stringify(_stations);
};

const isValid = (_stationName) => {
  if (isNull(_stationName)) {
    alert("역 이름을 입력해주세요.");
    return;
  } else if (isUnderTwo(_stationName)) {
    alert("두 글자 이상의 이름을 입력해주세요.");
    return;
  } else if (isDuplication(loadStations(), _stationName)) {
    alert("중복된 역 이름입니다.");
    return;
  }

  return true;
};

const getStationName = () => {
  const stationNameInput = document.getElementById("station-name-input");
  const stationName = stationNameInput.value;

  stationNameInput.value = "";

  if (isValid(stationName)) {
    return stationName;
  }
};

const createStation = () => {
  const stationName = getStationName();

  if (stationName) {
    return new Station(stationName);
  }
};

const useStation = (_stationName) => {
  const stations = loadStations();

  stations.find((x) => x.name === _stationName).usedCount++;
  saveStations(stations);
};

const disUseStation = (_stationName) => {
  const stations = loadStations();

  stations.find((x) => x.name === _stationName).usedCount--;
  saveStations(stations);
};

const deleteStation = (_stationDeletebtn) => {
  const stations = loadStations();
  const stationIndex = _stationDeletebtn.path[2].dataset.stationIndex;

  if (!isZero(stations[stationIndex].usedCount)) {
    alert("사용중인 역입니다.");
    return;
  }

  stations.splice(stationIndex, 1);

  return stations;
};

const setStationDeleteBtn = () => {
  const stationDeleteBtn = document.getElementsByClassName(
    "station-delete-button"
  );

  for (let i = 0; i < stationDeleteBtn.length; i++) {
    stationDeleteBtn[i].addEventListener("click", (e) => {
      const stationsWithoutDeleteStation = deleteStation(e);

      if (stationsWithoutDeleteStation) {
        saveStations(stationsWithoutDeleteStation);
        createStationList(stationsWithoutDeleteStation);
        setStationDeleteBtn();
      }
    });
  }
};

const setStationAddBtn = () => {
  const stationAddBtn = document.getElementById("station-add-button");

  stationAddBtn.addEventListener("click", () => {
    const newStation = createStation();

    if (newStation) {
      saveStations([...loadStations(), newStation]);
      createStationList(loadStations());
      setStationDeleteBtn();
    }
  });
};

export default function StationManager() {
  printLayout();
  setStationAddBtn();
  createStationList(loadStations());
  setStationDeleteBtn();
}

export { loadStations, useStation, disUseStation };
