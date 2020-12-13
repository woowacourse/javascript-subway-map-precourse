import { container, htmlLabel, textLabel } from "../consts/consts.js";
import { createElement, createLineObject } from "../utils/utils.js";
import { lineData } from "../index.js";

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

  if (inputValidator(currentLineValue, currentStartValue, currentEndValue)) {
    insertData([
      currentLineValue,
      currentStartValue,
      currentEndValue,
      createDeleteButton(),
    ]);
    updateLocalStorage();
  }
};

const createDeleteButton = () => {
  const lineDeleteButtonObj = createElement("button");
  lineDeleteButtonObj.setAttribute("class", "line-delete-button");
  lineDeleteButtonObj.innerText = textLabel.DELETE;

  lineDeleteButtonObj.addEventListener("click", () =>
    handleLineDeleteButton(currentLineValue)
  );

  return lineDeleteButtonObj;
};

const handleLineDeleteButton = (value) => {
  if (!confirm(textLabel.CONFIRM)) return;

  delete lineData[value];
  updateLocalStorage();
};

const insertData = (dataArray) => {
  const row = lineTable.insertRow(-1);

  for (let i = 0; i < dataArray.length; i++) {
    const cell = row.insertCell(i);

    if (typeof dataArray[i] === "string") cell.innerText = dataArray[i];
    if (typeof dataArray[i] === "HTMLElement") cell.appendChild(dataArray[i]);
  }

  lineData[dataArray[0]] = createLineObject(dataArray[1], dataArray[2]);
};

const inputValidator = (lineName, startStation, endStation) => {
  if (startStation === endStation || lineData[lineName]) return false;
  return true;
};

const updateLocalStorage = () => {
  window.localStorage.line = JSON.stringify(lineData);
};
