import { createDiv, createHeader, createList } from "../utils/createTag.js";
import { clearChilds, displayChilds } from "../utils/display.js";
import { loadMapInfo } from "./mapContainer.js";

const createMap = () => {
  const { lineArray, stationArray } = loadMapInfo();

  const map = createDiv("", "", "map");

  for (let i = 0; i < lineArray.length; i++) {
    const line = createHeader(3, lineArray[i]);
    const ul = document.createElement("ul");

    stationArray[i].forEach((station) => {
      const li = createList(station);
      ul.appendChild(li);
    });

    map.appendChild(line);
    map.appendChild(ul);
  }

  return map;
};

export const displayMap = () => {
  const root = document.getElementById("root");
  const map = createMap();

  clearChilds("root");
  displayChilds("root", [map]);
};
