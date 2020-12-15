import {
  stationMangeContainer,
  lineMangeContainer,
  selectLineContainer,
  sectionManageContainer,
  mapContainer,
} from "./dom.js";
import Station from "../components/Station.js";
import Line from "../components/Line.js";
import { addLocalStorageByKey, deleteDataByName } from "../utils/util.js";
import { addSection, deleteSection } from "../utils/sectionUtil.js";
import {
  addStationValidate,
  deleteStationValidate,
  addLineValidate,
  addSectionValidate,
  deleteSectionValidate,
} from "../utils/validator.js";
import {
  STATION,
  LINE,
  SECTION,
  DELETE_CONFIRM_MESSAGE,
} from "../constants.js";

export const clearMangeContainer = () => {
  const container = document.getElementById("subway-manager-container");
  container.innerHTML = "";
};

//section
export const insertSectionTable = (targetElem) => {
  const lineName = targetElem.dataset.name;
  const order = document.getElementById("section-order-input").value;
  const station = document.getElementById("section-station-selector").value;
  try {
    if (addSectionValidate(parseInt(order), station, lineName)) {
      addSection(order, station, lineName);
      rendSectionAddDom(lineName);
    } else {
      alert(SECTION.INPUT_ERROR_MESSAGE);
    }
  } catch (e) {}
};

export const confirmSectionDelete = (targetElem) => {
  const lineName = targetElem.dataset.name;
  try {
    if (deleteSectionValidate(targetElem)) {
      deleteSection(targetElem.dataset.index, lineName);
      rendSectionAddDom(lineName);
    } else {
      alert(SECTION.DELETE_ERROR_MESSAGE);
    }
  } catch (e) {}
};

export const setSectionEvent = () => {
  document.querySelectorAll(".section-delete-button").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm(DELETE_CONFIRM_MESSAGE)) confirmSectionDelete(event.target);
    });
  });

  document
    .getElementById("section-add-button")
    .addEventListener("click", (event) => {
      insertSectionTable(event.target);
    });
};

export const rendSectionAddDom = (lineName) => {
  clearMangeContainer();
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.setAttribute("id", "section-table");
  div.innerHTML = sectionManageContainer(lineName);
  container.appendChild(div);
  setSectionEvent();
};

export const rendLineSelectDom = () => {
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.innerHTML = selectLineContainer();
  container.appendChild(div);
};

//Map
export const rendStationMap = () => {
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.setAttribute("class", "map");
  div.innerHTML = mapContainer();
  container.appendChild(div);
};
