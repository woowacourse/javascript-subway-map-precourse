import { KEY } from "../constants/index.js";
import { checkLineList, confirmDelete } from "../utils/message.js";
import {
  checkDuplicateLine,
  checkEmpty,
  checkIsLine,
  checkSameStation,
} from "../validation/index.js";
import { displayAddedLine, removeDisplayLine } from "./linePresenter.js";

export const saveLines = (stationArray) =>
  localStorage.setItem(KEY.LINE, JSON.stringify(stationArray));

const clearLines = () => localStorage.removeItem(KEY.LINE);

export const loadLines = () => JSON.parse(localStorage.getItem(KEY.LINE));

const addLine = (lineName, startStation, endStation) => {
  const lines = loadLines() || [];
  const newLine = {};
  newLine[lineName] = [startStation, endStation];

  lines.push(newLine);

  saveLines(lines);

  return newLine;
};

const removeLine = (event) => {
  const {
    target: {
      parentNode: { parentNode },
    },
  } = event;

  const targetLine = parentNode.childNodes[0].innerText;
  const currentLines = loadLines();

  const filteredLines = currentLines.filter(
    (line) => Object.keys(line)[0] !== targetLine
  );

  clearLines();
  saveLines(filteredLines);
};

const lineRemoveClicked = (event) => {
  const isDelete = confirmDelete();

  if (isDelete) {
    removeDisplayLine(event);
    removeLine(event);
  }
};

const activateRemoveLine = () => {
  const lineRemoveButton = document.getElementsByClassName(
    "line-delete-button"
  );

  for (let i = 0; i < lineRemoveButton.length; i++) {
    lineRemoveButton[i].addEventListener("click", lineRemoveClicked);
  }
};

const lineAddClicked = () => {
  const lineInput = document.getElementById("line-name-input");
  const startStation = document.getElementById("line-start-station-selector")
    .value;
  const endStation = document.getElementById("line-end-station-selector").value;
  const lineInputValue = lineInput.value;

  const isEmpty = checkEmpty(lineInputValue);
  const isDuplicate = checkDuplicateLine(lineInputValue);
  const isSameStation = checkSameStation(startStation, endStation);
  const isInclude = checkIsLine(lineInputValue);
  const checkList = { isEmpty, isDuplicate, isSameStation, isInclude };
  const isValid = checkLineList(checkList, lineInput);

  if (isValid) {
    const newLine = addLine(lineInputValue, startStation, endStation);
    displayAddedLine(newLine);
    activateRemoveLine();
  }
};

const initialTable = () => {
  const lines = loadLines();

  if (lines) {
    lines.forEach((line) => displayAddedLine(line));
    activateRemoveLine();
  }
};

export const lineStart = () => {
  const lineAddButton = document.getElementById("line-add-button");

  lineAddButton.addEventListener("click", lineAddClicked);

  initialTable();
};
