import { stationArray } from "../index.js";
import { container } from "../consts/consts.js";
import { createElement } from "../utils/utils.js";

import { textLabel, htmlLabel } from "../consts/consts.js";

const stationInputElement = createElement("input");
const stationAddButtonElement = createElement("button");
const stationParagraph = createElement("p");
const stationHeading = createElement("h2");
const stationTable = createElement("table");
const stationHTMLElements = [
  stationParagraph,
  stationInputElement,
  stationAddButtonElement,
  stationHeading,
  stationTable,
];

stationInputElement.setAttribute("id", "station-name-input");
stationAddButtonElement.setAttribute("id", "station-add-button");
stationParagraph.innerText = textLabel.STATION_PARAGRAPH;
stationAddButtonElement.innerText = textLabel.STATION_ADD_BUTTON;
stationHeading.innerText = textLabel.STATION_HEADING;
stationTable.innerHTML = htmlLabel.STATION_TABLE;

export const initStationManager = () => {
  stationInputElement.innerText = textLabel.STATION_INPUT;

  stationHTMLElements.map((item) => container.appendChild(item));

  stationAddButtonElement.addEventListener("click", handleStationAddButton);
};

const handleStationAddButton = () => {
  const currentValue = stationInputElement.value;
  if (inputValidator(currentValue)) {
    stationArray.push(currentValue);

    const stationDeleteButtonObj = createElement("button");
    stationDeleteButtonObj.setAttribute("class", "station-delete-button");
    stationDeleteButtonObj.innerText = textLabel.DELETE;

    stationDeleteButtonObj.addEventListener("click", () =>
      handleStationDeleteButton(currentValue)
    );

    insertTable(stationInputElement.value, stationDeleteButtonObj);
  }
};

const handleStationDeleteButton = (value) => {
  if (!confirm(textLabel.CONFIRM)) return;

  const index = stationArray.indexOf(value);
  stationTable.deleteRow(index + 1);
  stationArray.splice(index, 1);

  updateStationData();
};

const insertTable = (data_1, data_2) => {
  const row = stationTable.insertRow(-1);
  const cell_1 = row.insertCell(0);
  const cell_2 = row.insertCell(1);

  cell_1.innerHTML = data_1;
  cell_2.appendChild(data_2);

  updateStationData();
};

const updateStationData = () => {
  window.localStorage.station = stationArray;
};

const inputValidator = (inputString) => {
  return inputString.length >= 2 && stationArray.indexOf(inputString) === -1;
};
