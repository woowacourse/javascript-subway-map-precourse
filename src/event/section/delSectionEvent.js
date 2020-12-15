import { renderSection } from "../../render/renderSection.js";
import { getIndexOfLine } from "./addSectionEvent.js";
import { isSatisfyMinNumOfStations } from "../../common/checkInput.js";
import { alertMessage } from "../../common/alertMessage.js";

function getIndexOfSection(indexOfLine, section) {
  const lines = JSON.parse(localStorage.lines);
  let indexOfSection;

  for (let i = 0; i < lines[indexOfLine].sections.length; i++) {
    if (section === lines[indexOfLine].sections[i]) {
      indexOfSection = i;
      break;
    }
  }

  return indexOfSection;
}

function delSection(selectedLine, section) {
  const indexOfLine = getIndexOfLine(selectedLine);
  const indexOfSection = getIndexOfSection(indexOfLine, section);
  let lines = JSON.parse(localStorage.lines);

  if (!isSatisfyMinNumOfStations(lines[indexOfLine])) {
    return alert(alertMessage.DELETE_STATIONS_ON_LINE_SHORTAGE_MESSAGE);
  }

  lines[indexOfLine].sections.splice(indexOfSection, 1);
  localStorage.lines = JSON.stringify(lines);

  renderSection(selectedLine);
}

function findDeleteTarget(event, selectedLine) {
  const $target = event.target;
  const $sectionTable = document.getElementsByClassName("section-table-row");
  const targetNumber = $target.closest("tr").dataset.number;
  const section = $sectionTable[targetNumber].querySelector("span").innerText;

  delSection(selectedLine, section);
}

export default function delSectionEvent(selectedLine) {
  const $delSectionBtn = document.querySelectorAll(".section-delete-button");

  $delSectionBtn.forEach((button) =>
    button.addEventListener("click", (event) => {
      if (confirm(alertMessage.DELETE_CHECK_MESSAGE)) {
        findDeleteTarget(event, selectedLine);
      }
    })
  );
}
