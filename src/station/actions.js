import Station from "./model.js";
import {
  stationInputForm,
  stationList,
  stationListHeader,
  stationDeleteBtn,
} from "./templates.js";

const stationManagerBtn = document.getElementById("station-manager-button");

const loadStations = () => {
  return JSON.parse(stationManagerBtn.dataset.stations);
};

const saveStations = (_stations) => {
  stationManagerBtn.dataset.stations = JSON.stringify(_stations);
};

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = stationInputForm + stationList;
};

const createStationList = (_stations) => {
  const stationNames = document.getElementById("station-names");
  stationNames.innerHTML = stationListHeader;

  for (let i = 0; i < _stations.length; i++) {
    stationNames.innerHTML += `<tr data-station-index="${i}"><td>${_stations[i].name}</td>${stationDeleteBtn}</tr>`;
  }
};

const updateStationList = (_stations, _newStation) => {
  if (!_stations) {
    return;
  }

  if (_newStation) {
    saveStations([..._stations, _newStation]);
  } else {
    saveStations(_stations);
  }

  createStationList(loadStations());
};

const isNull = (value) => {
  return value === "";
};

const isUnderTwo = (value) => {
  return value.length < 2;
};

const isDuplication = (value) => {
  return (
    loadStations()
      .map((x) => x.name)
      .indexOf(value) !== -1
  );
};

const isValid = (_stationName) => {
  if (isNull(_stationName)) {
    alert("역 이름을 입력해주세요.");
    return;
  } else if (isUnderTwo(_stationName)) {
    alert("두 글자 이상의 이름을 입력해주세요.");
    return;
  } else if (isDuplication(_stationName)) {
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

const isUsed = (_station) => {
  return _station.used !== 0;
};

const deleteStation = (_stationDeletebtn) => {
  const stations = loadStations();
  const stationIndex = _stationDeletebtn.path[2].dataset.stationIndex;

  if (isUsed(stations[stationIndex])) {
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
      updateStationList(deleteStation(e));
      setStationDeleteBtn();
    });
  }
};

export default function StationManager() {
  printLayout();
  createStationList(loadStations());
  setStationDeleteBtn();

  const stationAddBtn = document.getElementById("station-add-button");

  stationAddBtn.addEventListener("click", () => {
    updateStationList(loadStations(), createStation());
    setStationDeleteBtn();
  });
}

export { loadStations, saveStations };
