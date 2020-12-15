import { WORDS } from "../constants/index.js";
import {
  createButton,
  createDiv,
  createHeader,
  createInput,
  createTable,
  createStationTableRow,
} from "../utils/createTag.js";
import { clearChilds, displayChilds } from "../utils/display.js";

export const displayInitialStation = () => {
  const COL_TITLE_ARRAY = [WORDS.STATION.LIST_COL1, WORDS.STATION.LIST_COL2];
  const div = createDiv(WORDS.STATION.INPUT_TITLE, "margin-top:20px;");
  const input = createInput(
    "station-name-input",
    WORDS.STATION.INPUT_PLACEHOLDER
  );
  const button = createButton(
    "station-add-button",
    "",
    WORDS.STATION.ADD_BUTTON
  );
  const h2 = createHeader(2, WORDS.STATION.LIST_TITLE);
  const table = createTable(COL_TITLE_ARRAY);

  clearChilds("root");
  displayChilds("root", [div, input, button, h2, table]);

  return true;
};

export const displayAddedStation = (stationName) => {
  const table = document.querySelector("table");

  const tr = createStationTableRow(stationName);

  table.appendChild(tr);
};

export const removeDisplayStation = (event) => {
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
