import { WORDS } from "../constants/index.js";
import { loadLines } from "../Line/lineContainer.js";
import { loadStations } from "../Station/stationContainer.js";
import {
  createButton,
  createDivContainer,
  createHeader,
  createInput,
  createSectionTableRow,
  createSelect,
  createTable,
} from "../utils/createTag.js";
import { clearChilds, displayChilds, removeElement } from "../utils/display.js";
import { initialSection } from "./sectionContainer.js";

export const displayInitialSection = () => {
  const lines = loadLines() || [];
  const lineArray = lines.map((line) => Object.keys(line)[0]);
  const sectionChoiceTitle = createHeader(3, WORDS.SECTION.CHOICE_TITLE);
  const buttonArray = [];
  lineArray.forEach((line) => {
    const button = createButton(
      "",
      "section-line-menu-button",
      line,
      "margin-right:5px;"
    );
    buttonArray.push(button);
  });
  const buttonContainer = createDivContainer(buttonArray);

  clearChilds("root");
  displayChilds("root", [sectionChoiceTitle, buttonContainer]);

  return true;
};

const inputPart = () => {
  const stations = loadStations() || [];
  const select = createSelect("section-station-selector", stations);
  const input = createInput(
    "section-order-input",
    WORDS.SECTION.INPUT_PLACEHOLDER,
    "number"
  );
  const button = createButton(
    "section-add-button",
    "",
    WORDS.SECTION.ADD_BUTTON
  );
  const container = createDivContainer(
    [select, input, button],
    "margin-bottom:20px"
  );

  return container;
};

export const displayAddedSection = (table, sectionInfo, index) => {
  const tr = createSectionTableRow(sectionInfo, index);

  table.appendChild(tr);
};

export const displaySectionUtil = (line) => {
  const sectionDataArray = initialSection(line);
  const sectionTitle = createHeader(3, line + WORDS.SECTION.LINE_TITLE);
  const addTitle = createHeader(4, WORDS.SECTION.ADD_TITLE);
  const inputDiv = inputPart();
  const table = createTable(WORDS.SECTION.LIST_COL_ARRAY);
  sectionDataArray.forEach((section, index) => {
    displayAddedSection(table, section, index);
  });
  const content = [sectionTitle, addTitle, inputDiv, table];
  const sectionWrapper = createDivContainer(content, "", "section");
  const previousSection = document.getElementById("section");

  if (previousSection) {
    removeElement("section");
  }
  displayChilds("root", [sectionWrapper]);

  return true;
};
