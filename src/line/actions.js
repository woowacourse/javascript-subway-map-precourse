import Line from "./models.js";
import { loadStations, useStation } from "../station/actions.js";
import {
  lineInputForm,
  lineList,
  lineListHeader,
  lineDeleteBtn,
} from "./templates.js";

const lineManagerBtn = document.getElementById("line-manager-button");

const loadLines = () => {
  return JSON.parse(lineManagerBtn.dataset.stations).map(
    (x) => new Line(x.name, x.inLineStations)
  );
};

const saveLines = (_lines) => {
  lineManagerBtn.dataset.stations = JSON.stringify(_lines);
};

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = lineInputForm + lineList;
};

const createStationSelector = (_stations) => {
  const startStationSelector = document.getElementById(
    "line-start-station-selector"
  );
  const endStationSelector = document.getElementById(
    "line-end-station-selector"
  );

  for (let i = 0; i < _stations.length; i++) {
    startStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
    endStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
  }
};

const createStationList = (_lines) => {
  const lineNames = document.getElementById("line-names");
  lineNames.innerHTML = lineListHeader;
};

const getLineName = () => {
  const lineNameInput = document.getElementById("line-name-input");
  const lineName = lineNameInput.value;

  lineNameInput.value = "";

  return lineName;
};

const getStartStation = () => {
  return document.getElementById("line-start-station-selector").value;
};

const getEndStation = () => {
  return document.getElementById("line-end-station-selector").value;
};

const createLine = () => {
  const lineName = getLineName();

  if (lineName) {
    const startStation = getStartStation();
    const endStation = getEndStation();

    useStation(startStation);
    useStation(endStation);

    return new Line(lineName, [startStation, endStation]);
  }
};

export default function LineManager() {
  printLayout();
  createStationSelector(loadStations());
  createStationList(loadLines());

  const lineAddBtn = document.getElementById("line-add-button");

  lineAddBtn.addEventListener("click", () => {
    console.log(createLine());
  });
}
