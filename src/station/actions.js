import Station from "./model.js";
import {
  stationInputForm,
  stationList,
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

  for (let i = 0; i < _stations.length; i++) {
    stationNames.innerHTML += `<tr><td>${_stations[i].name}</td>${stationDeleteBtn}</tr>`;
  }
};

const updateStationList = (_stations, _newStation) => {
  if (_newStation) {
    createStationList([_newStation]);
    saveStations([..._stations, _newStation]);
  }
};

const getStationName = () => {
  const stationNameInput = document.getElementById("station-name-input");
  const stationName = stationNameInput.value;

  stationNameInput.value = "";

  return stationName;
};

const createStation = () => {
  const stationName = getStationName();

  if (stationName) {
    return new Station(stationName);
  }
};

export default function StationManager() {
  printLayout();
  createStationList(loadStations());

  const stationAddBtn = document.getElementById("station-add-button");

  stationAddBtn.addEventListener("click", () => {
    updateStationList(loadStations(), createStation());
  });
}
