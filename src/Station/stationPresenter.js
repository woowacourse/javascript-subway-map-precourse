import { WORDS } from "../constants/index.js";
import { createButton, createDiv, createInput } from "../utils/createTag.js";
import { clearChilds, displayChilds } from "../utils/displayRoot.js";

export const displayStationUtil = () => {
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

  clearChilds();
  displayChilds([div, input, button]);
};
