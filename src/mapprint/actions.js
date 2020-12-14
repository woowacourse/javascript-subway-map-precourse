import { MapContainer } from "./templates.js";
import { loadLines } from "../line/actions.js";

const printLayout = () => {
  const lines = loadLines();
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = "";

  for (let i = 0; i < lines.length; i++) {
    managerContainer.innerHTML += MapContainer;
  }
};

const getLineName = (_line) => {
  return `<h3>${_line.name}</h3>`;
};

const getInLineStations = (_line) => {
  let inLineStations = "";

  for (let i = 0; i < _line.lineLength(); i++) {
    inLineStations += `<li>${_line.inLineStations[i]}</li>`;
  }

  return inLineStations;
};

const createMap = () => {
  const lines = loadLines();
  const mapContainer = document.getElementsByClassName("map");

  for (let i = 0; i < mapContainer.length; i++) {
    const line = lines[i];

    mapContainer[i].innerHTML = `
    ${getLineName(line)}<ul>${getInLineStations(line)}</ul>
    `;
  }
};

export default function MapPrintManager() {
  printLayout();
  createMap();
}
