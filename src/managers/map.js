import { container } from "../consts/consts.js";
import { clearContainer, createElement } from "../utils/utils.js";
import { lineData } from "../index.js";

const mapContainer = createElement("div");

mapContainer.setAttribute("class", "map");

export const initMapManager = () => {
  clearContainer(mapContainer);
  container.append(mapContainer);
  initMapContainer(mapContainer);
};

const initMapContainer = (mapContainer) => {
  for (let i = 0; i < Object.keys(lineData).length; i++) {
    const mapLineContainer = createElement("div");
    const lineName = Object.keys(lineData)[i];

    mapContainer.appendChild(mapLineContainer);
    createMapList(mapLineContainer, lineName, lineData[lineName]);
  }
};

const createMapList = (container, lineName, sectionArray) => {
  const lineHeading = createElement("h3");
  lineHeading.innerText = lineName;

  const lineList = createElement("ul");
  for (let i = 0; i < sectionArray.length; i++) {
    lineList.innerHTML += `<li>${sectionArray[i]}</li>`;
  }

  container.append(lineHeading, lineList);
};
