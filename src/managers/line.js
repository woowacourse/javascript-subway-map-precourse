import {
  alertLabel,
  container,
  htmlLabel,
  textLabel,
} from "../consts/consts.js";
import { createElement } from "../utils/utils.js";
import { appContainer, lineData } from "../index.js";

const lineAddContainer = createElement("p");
const lineStartContainer = createElement("div");
const lineEndContainer = createElement("div");
const lineParagraph = createElement("div");
const lineInputElement = createElement("input");
const lineStartSpan = createElement("span");
const lineStartSelect = createElement("select");
const lineEndSpan = createElement("span");
const lineEndSelect = createElement("select");
const lineAddButtonElement = createElement("button");
const lineHeading = createElement("h2");
const lineTable = createElement("table");
const lineHTMLElements = [
  lineAddContainer,
  lineStartContainer,
  lineEndContainer,
  lineAddButtonElement,
  lineHeading,
  lineTable,
];

lineAddContainer.append(lineParagraph, lineInputElement);
lineStartContainer.append(lineStartSpan, lineStartSelect);
lineEndContainer.append(lineEndSpan, lineEndSelect);
lineInputElement.setAttribute("id", "line-name-input");
lineStartSelect.setAttribute("id", "line-start-station-selector");
lineEndSelect.setAttribute("id", "line-end-station-selector");
lineAddButtonElement.setAttribute("id", "line-add-button");

lineParagraph.innerText = textLabel.LINE_PARAGRAPH;
lineStartSpan.innerText = textLabel.LINE_START_SPAN;
lineEndSpan.innerText = textLabel.LINE_END_SPAN;
lineAddButtonElement.innerText = textLabel.LINE_ADD_BUTTON;
lineHeading.innerText = textLabel.LINE_HEADING;
lineTable.innerHTML = htmlLabel.LINE_TABLE;

export const initLineManager = () => {
  lineInputElement.innerText = textLabel.LINE_INPUT;

  initLineSelect();

  lineHTMLElements.map((item) => container.appendChild(item));
  updateTable();

  lineAddButtonElement.addEventListener("click", handleLineAddButton);
};

const initLineSelect = () => {
  let localStorage = window.localStorage.station || "";
  const lineOptions = localStorage.split(",");

  let optionString = "";
  for (let i = 0; i < lineOptions.length; i++) {
    optionString += `<option value="${lineOptions[i]}">${lineOptions[i]}</option>`;
  }

  lineStartSelect.innerHTML = optionString;
  lineEndSelect.innerHTML = optionString;
};

const handleLineAddButton = () => {
  const currentLineValue = lineInputElement.value;
  const currentStartValue = lineStartSelect.value;
  const currentEndValue = lineEndSelect.value;
  const deleteButton = createDeleteButton(currentLineValue);
  if (inputValidator(currentLineValue, currentStartValue, currentEndValue)) {
    insertData([
      currentLineValue,
      currentStartValue,
      currentEndValue,
      deleteButton,
    ]);
    lineData[currentLineValue] = [currentStartValue, currentEndValue];
    updateLocalStorage();
  }
};

const createDeleteButton = (value) => {
  const lineDeleteButtonObj = createElement("button");
  lineDeleteButtonObj.setAttribute("class", "line-delete-button");
  lineDeleteButtonObj.innerText = textLabel.DELETE;

  lineDeleteButtonObj.addEventListener("click", () =>
    handleLineDeleteButton(value)
  );

  return lineDeleteButtonObj;
};

const handleLineDeleteButton = (value) => {
  if (!confirm(textLabel.CONFIRM)) return;

  const index = Object.keys(lineData).indexOf(value);
  lineTable.deleteRow(index + 1);

  delete lineData[value];
  updateLocalStorage();
};

const insertData = (dataArray) => {
  const row = lineTable.insertRow(-1);

  for (let i = 0; i < dataArray.length; i++) {
    const cell = row.insertCell(i);

    if (typeof dataArray[i] === "string") cell.innerHTML = dataArray[i];
    else cell.appendChild(dataArray[i]);
  }
};

const inputValidator = (lineName, startStation, endStation) => {
  if (startStation === endStation) {
    alert(alertLabel.LINE_START_END_EQUAL);
  } else if (lineData[lineName]) {
    alert(alertLabel.LINE_NAME_ALREADY_EXISTS);
  } else {
    return true;
  }
  return false;
};

const findStationInLine = (stationArr) => {
  for (let i = 0; i < Object.keys(lineData).length; i++) {
    const lineArray = lineData[Object.keys(lineData)[i]];
    if (
      lineArray.indexOf(stationArr[0]) >= 0 ||
      lineArray.indexOf(stationArr[1]) >= 0
    ) {
      return true;
    }
  }

  return false;
};

const updateLocalStorage = () => {
  window.localStorage.line = JSON.stringify(lineData);
  appContainer.dataset.line = window.localStorage.line;
};

const updateTable = () => {
  lineTable.innerHTML = htmlLabel.LINE_TABLE;

  for (let i = 0; i < Object.keys(lineData).length; i++) {
    const lineName = Object.keys(lineData)[i];
    const sectionArray = lineData[lineName];
    const deleteButton = createDeleteButton(lineName);
    insertData([
      lineName,
      sectionArray[0],
      sectionArray[sectionArray.length - 1],
      deleteButton,
    ]);
  }
};
