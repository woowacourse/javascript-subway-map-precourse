import { WORDS } from "../constants/index.js";
import { loadLines } from "../Line/lineContainer.js";
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
