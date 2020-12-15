import { renderSection } from "../../render/renderSection.js";
import { isSectionAlreadyExist, isTransferStation } from "../../common/checkInput.js";
import { alertMessage } from "../../common/alertMessage.js";
import { clearInput } from "../../common/clearInput.js";

export function getIndexOfLine(lineName) {
  const lines = JSON.parse(localStorage.lines);
  let indexOfLine;

  for (let i = 0; i < lines.length; i++) {
    if (lineName === lines[i].name) {
      indexOfLine = i;
      break;
    }
  }

  return indexOfLine;
}

function addSection(indexOfLine, selectedLine, selectedStaion, stationOrder) {
  let lines = JSON.parse(localStorage.lines);
  lines[indexOfLine].sections = [
    ...lines[indexOfLine].sections.slice(0, stationOrder),
    selectedStaion,
    ...lines[indexOfLine].sections.slice(stationOrder),
  ];
  localStorage.lines = JSON.stringify(lines);

  renderSection(selectedLine);
  clearInput();
}

function checkValidSection(selectedLine) {
  const selectedStation = document.getElementById("section-station-selector").value;
  const stationOrder = document.getElementById("section-order-input").value;
  const lines = JSON.parse(localStorage.lines);
  const indexOfLine = getIndexOfLine(selectedLine);
  if (isSectionAlreadyExist(lines[indexOfLine].sections, selectedStation)) {
    return alert(alertMessage.SAME_SECTION_EXIST_ERROR);
  } else if (stationOrder === "") {
    return alert(alertMessage.ORDERING_INPUT_NOTHING_ERROR);
  } else if (isTransferStation(lines, selectedStation)) {
    return alert(`${selectedStation}` + alertMessage.TRANSFER_STATION_MESSAGE);
  }

  addSection(indexOfLine, selectedLine, selectedStation, stationOrder);
}

export default function addSectionEvent(selectedLine) {
  const $addSectionBtn = document.getElementById("section-add-button");
  $addSectionBtn.addEventListener("click", () => checkValidSection(selectedLine));
}
