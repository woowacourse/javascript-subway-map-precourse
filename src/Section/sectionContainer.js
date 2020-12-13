import { loadLines, saveLines } from "../Line/lineContainer.js";
import { checkSectionList } from "../utils/message.js";
import {
  checkDuplicateSection,
  checkEmpty,
  checkRange,
} from "../validation/index.js";
import { displaySectionUtil } from "./sectionPresenter.js";

const filterTargetRow = (targetRow, selectLine, lines) => {
  const deleteTargetStation = targetRow.childNodes[1].innerText;

  const filteredLine = lines.filter(
    (line) => selectLine === Object.keys(line)[0]
  );
  const currentSection = Object.values(filteredLine[0])[0];

  const filteredSection = currentSection.filter(
    (station) => station !== deleteTargetStation
  );

  return filteredSection;
};

const handleDeleteClicked = (event, selectLine) => {
  const {
    target: {
      parentNode: { parentNode },
    },
  } = event;
  const lines = loadLines() || [];

  const filteredSection = filterTargetRow(parentNode, selectLine, lines);

  const changedLine = lines.map((line) => {
    if (selectLine === Object.keys(line)[0]) {
      line[selectLine] = filteredSection;
    }

    return line;
  });

  saveLines(changedLine);
  displaySectionUtil(selectLine);
  sectionUtilHandler(selectLine);
};

const activateDeleteButton = (line) => {
  const sectionDeleteButtons = document.getElementsByClassName(
    "section-delete-button"
  );

  for (let i = 0; i < sectionDeleteButtons.length; i++) {
    sectionDeleteButtons[i].addEventListener("click", (e) => {
      handleDeleteClicked(e, line);
    });
  }
};

const addLine = (selectLine, station, index) => {
  const lines = loadLines() || [];
  const filteredLine = lines.filter(
    (line) => selectLine === Object.keys(line)[0]
  );
  const currentSection = Object.values(filteredLine[0])[0];
  currentSection.splice(index, 0, station);

  const changedLine = lines.map((line) => {
    if (selectLine === Object.keys(line)[0]) {
      line[selectLine] = currentSection;
    }
    return line;
  });

  saveLines(changedLine);
  displaySectionUtil(selectLine);
  sectionUtilHandler(selectLine);
};

const sectionAddClicked = (line) => {
  const stationSelectValue = document.getElementById("section-station-selector")
    .value;
  const orderInput = document.getElementById("section-order-input");
  const orderInputValue = orderInput.value;
  const table = document.querySelector("table");
  const rangeRefrence = table.childNodes.length;

  const isEmpty = checkEmpty(orderInputValue);
  const isWrongRange = checkRange(rangeRefrence, orderInputValue);
  const isDuplicate = checkDuplicateSection(line, stationSelectValue);
  const checkList = { isEmpty, isWrongRange, isDuplicate };
  const isValid = checkSectionList(checkList, orderInput);

  if (isValid) {
    addLine(line, stationSelectValue, orderInputValue);
    activateDeleteButton(line);
  }
};

const sectionUtilHandler = (line) => {
  const sectionAddButton = document.getElementById("section-add-button");

  sectionAddButton.addEventListener("click", () => {
    sectionAddClicked(line);
  });
  activateDeleteButton(line);
};

const sectionMenuClicked = (event) => {
  const {
    target: { innerText: line },
  } = event;
  const isDisplayed = displaySectionUtil(line);

  if (isDisplayed) {
    sectionUtilHandler(line);
  }
};

export const initialSection = (targetLine) => {
  const currentLines = loadLines();

  const filteredLines = currentLines.filter(
    (line) => Object.keys(line)[0] === targetLine
  );
  const section = Object.values(filteredLines[0])[0];

  return section;
};

export const sectionStart = () => {
  const sectionMenuButton = document.getElementsByClassName(
    "section-line-menu-button"
  );

  for (let i = 0; i < sectionMenuButton.length; i++) {
    sectionMenuButton[i].addEventListener("click", sectionMenuClicked);
  }
};
