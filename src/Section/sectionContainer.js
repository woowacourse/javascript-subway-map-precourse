import { loadLines } from "../Line/lineContainer.js";
import { displaySectionUtil } from "./sectionPresenter.js";

const sectionMenuClicked = (event) => {
  const {
    target: { innerText: line },
  } = event;

  displaySectionUtil(line);
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
