import {
  container,
  textLabel,
  htmlLabel,
  alertLabel,
} from "../consts/consts.js";
import { appContainer, lineData } from "../index.js";
import { createElement } from "../utils/utils.js";

const sectionHeading = createElement("h3");
const sectionButtonContainer = createElement("div");
const sectionContainer = createElement("div");
const sectionContainerHeading = createElement("h3");
const sectionContainerParagraph = createElement("h4");
const sectionStationSelect = createElement("select");
const sectionIndexInput = createElement("input");
const sectionAddButton = createElement("button");
const sectionTableContainer = createElement("p");
const sectionTable = createElement("table");
const sectionHTMLElements = [
  sectionHeading,
  sectionButtonContainer,
  sectionContainer,
];

sectionTableContainer.append(sectionTable);

sectionStationSelect.setAttribute("id", "section-station-selector");
sectionIndexInput.setAttribute("id", "section-order-input");
sectionAddButton.setAttribute("id", "section-add-button");

sectionHeading.innerText = textLabel.SECTION_HEADING;
sectionContainerParagraph.innerText = textLabel.SECTION_CONTAINER_PARAGRAPH;
sectionIndexInput.innerText = textLabel.SECTION_INPUT;
sectionAddButton.innerText = textLabel.SECTION_ADD_BUTTON;

export const initSectionManager = () => {
  sectionContainer.innerHTML = "";
  initButtonContainer();
  initSectionSelect();
  sectionHTMLElements.map((item) => container.appendChild(item));
};

const initSectionSelect = () => {
  let localStorage = window.localStorage.station || "";
  const stationOptions = localStorage.split(",");

  let optionString = "";
  for (let i = 0; i < stationOptions.length; i++) {
    optionString += `<option lineName="${stationOptions[i]}">${stationOptions[i]}</option>`;
  }

  sectionStationSelect.innerHTML = optionString;
};

const initButtonContainer = () => {
  sectionButtonContainer.innerHTML = "";

  let localStorage = window.localStorage.line || "";
  if (localStorage) {
    const lineObject = JSON.parse(localStorage);

    for (let i = 0; i < Object.keys(lineObject).length; i++) {
      const lineButton = createLineButton(Object.keys(lineObject)[i]);
      sectionButtonContainer.appendChild(lineButton);
    }
  }
};

const createLineButton = (lineName) => {
  const lineButton = createElement("button");
  lineButton.setAttribute("class", "section-line-menu-button");
  lineButton.innerText = lineName;

  lineButton.addEventListener("click", () => handleLineButton(lineName));
  return lineButton;
};

const handleLineButton = (lineName) => {
  sectionContainerHeading.innerText = `${lineName} 관리`;

  initSectionContainer(lineName);
  initSectionTable(lineName);
};

const initSectionContainer = (lineName) => {
  sectionContainer.innerHTML = "";
  sectionContainer.append(
    sectionContainerHeading,
    sectionContainerParagraph,
    sectionStationSelect,
    sectionIndexInput,
    sectionAddButton,
    sectionTableContainer
  );
  sectionAddButton.addEventListener("click", () => handleAddButton(lineName));
};

const initSectionTable = (lineName) => {
  sectionTable.innerHTML = htmlLabel.SECTION_TABLE;
  for (let i = 0; i < lineData[lineName].length; i++) {
    const deleteButton = createDeleteButton(lineName, lineData[lineName][i]);
    insertData([i.toString(), lineData[lineName][i], deleteButton]);
  }
};

const createDeleteButton = (lineName, stationName) => {
  const stationDeleteButton = createElement("button");
  stationDeleteButton.setAttribute("class", "section-delete-button");
  stationDeleteButton.innerText = textLabel.SECTION_DELETE_BUTTON;

  stationDeleteButton.addEventListener("click", () => {
    handleStationDeleteButton(lineName, stationName);
  });

  return stationDeleteButton;
};

const handleAddButton = (lineName) => {
  const stationName = sectionStationSelect.value;
  const stationOrder = sectionIndexInput.value;

  lineData[lineName].splice(stationOrder, 0, stationName);

  updateLocalStorage();
  initSectionTable(lineName);
};

const handleStationDeleteButton = (lineName, stationName) => {
  if (!confirm(textLabel.CONFIRM)) return;
  if (validStationDeleteButton(lineName)) {
    const index = lineData[lineName].indexOf(stationName);
    lineData[lineName].splice(index, 1);
    updateLocalStorage();

    initSectionTable(lineName);
  }
};

const validStationDeleteButton = (lineName) => {
  if (lineData[lineName].length <= 2) {
    alert(alertLabel.STATION_NUMBER_MINIMUM);
    return false;
  }

  return true;
};

const insertData = (dataArray) => {
  const row = sectionTable.insertRow(-1);

  for (let i = 0; i < dataArray.length; i++) {
    const cell = row.insertCell(i);

    if (typeof dataArray[i] === "string") cell.innerText = dataArray[i];
    else cell.appendChild(dataArray[i]);
  }
};

const updateLocalStorage = () => {
  window.localStorage.line = JSON.stringify(lineData);
  appContainer.dataset.line = window.localStorage.line;
};
