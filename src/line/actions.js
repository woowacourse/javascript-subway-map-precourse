import { loadStations, saveStations } from "../station/actions.js";
import {
  lineInputForm,
  lineList,
  lineListHeader,
  lineDeleteBtn,
} from "./templates.js";

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

const createStationList = () => {
  const lineNames = document.getElementById("line-names");
  lineNames.innerHTML = lineListHeader;
};

export default function LineManager() {
  printLayout();
  createStationSelector(loadStations());
  createStationList();
}
