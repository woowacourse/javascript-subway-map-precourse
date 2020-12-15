import { WORDS } from "../constants/index.js";
import { loadStations } from "../Station/stationContainer.js";
import {
  createButton,
  createDiv,
  createDivContainer,
  createHeader,
  createInput,
  createLabel,
  createLineTableRow,
  createSelect,
  createTable,
} from "../utils/createTag.js";
import { clearChilds, displayChilds } from "../utils/display.js";

const lineRow1 = () => {
  const inputTitle = createDiv(WORDS.LINE.INPUT_TITLE, "margin-top:20px;");
  const input = createInput("line-name-input", WORDS.LINE.INPUT_PLACEHOLDER);

  const container = createDivContainer(
    [inputTitle, input],
    "margin-bottom:20px"
  );

  return container;
};

const lineRow2 = (stations) => {
  const labelStart = createLabel(
    "line-start-station-selector",
    WORDS.LINE.START_LABEL
  );
  const selectStart = createSelect("line-start-station-selector", stations);
  const container = createDivContainer([labelStart, selectStart]);

  return container;
};

const lineRow3 = (stations) => {
  const labelEnd = createLabel(
    "line-end-station-selector",
    WORDS.LINE.END_LABEL
  );
  const selectEnd = createSelect("line-end-station-selector", stations);
  const container = createDivContainer(
    [labelEnd, selectEnd],
    "margin-bottom:20px"
  );

  return container;
};

export const displayAddedLine = (lineInfo) => {
  const table = document.querySelector("table");

  const tr = createLineTableRow(lineInfo);

  table.appendChild(tr);
};

export const displayInitialLine = () => {
  const stations = loadStations() || [];
  const InputPart = lineRow1();
  const SelectStart = lineRow2(stations);
  const SelectEnd = lineRow3(stations);
  const button = createButton("line-add-button", "", WORDS.LINE.ADD_BUTTON);
  const h2 = createHeader(2, WORDS.LINE.LIST_TITLE);
  const table = createTable(WORDS.LINE.LIST_COL_ARRAY);

  clearChilds("root");
  displayChilds("root", [InputPart, SelectStart, SelectEnd, button, h2, table]);

  return true;
};

export const removeDisplayLine = (event) => {
  const {
    target: {
      parentNode: {
        parentNode: target,
        parentNode: { parentNode: parent },
      },
    },
  } = event;

  parent.removeChild(target);
};
