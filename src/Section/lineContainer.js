import { KEY } from "../constants/index.js";
import { checkTheList } from "../utils/message.js";
import { checkEmpty } from "../validation/index.js";
import { displayAddedLine } from "./linePresenter.js";

const saveLines = (stationArray) =>
  localStorage.setItem(KEY.LINE, JSON.stringify(stationArray));

export const loadLines = () => JSON.parse(localStorage.getItem(KEY.LINE));

const addLine = (lineName, startStation, endStation) => {
  const lines = loadLines() || [];
  const newLine = {};
  newLine[lineName] = [startStation, endStation];

  lines.push(newLine);

  saveLines(lines);

  return newLine;
};

const lineAddClicked = () => {
  const lineInput = document.getElementById("line-name-input");
  const startStation = document.getElementById("line-start-station-selector")
    .value;
  const endStation = document.getElementById("line-end-station-selector").value;
  const lineInputValue = lineInput.value;

  const isEmpty = checkEmpty(lineInputValue);
  const checkList = [isEmpty];
  const isValid = checkTheList(checkList, lineInput);

  if (isValid) {
    const newLine = addLine(lineInputValue, startStation, endStation);
    displayAddedLine(newLine);
  }
};

const initialTable = () => {
  const lines = loadLines();

  if (lines) {
    lines.forEach((line) => displayAddedLine(line));
  }
};

export const lineStart = () => {
  const lineAddButton = document.getElementById("line-add-button");

  lineAddButton.addEventListener("click", lineAddClicked);

  initialTable();
};
