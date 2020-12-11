import StationManager from "../station-manager.js";
import LineManager from "../line-manager.js";
import {
  SECTION_MANAGER_CONTAINERS_ID,
  SELECTORS_ID,
  INPUT_FORM_ID,
  ADD_BUTTONS_ID,
} from "../html-constants/html-id-values.js";
import {
  LINE_SELECT_HEADER,
  SECTION_LINE_MENU_BUTTON,
} from "../html-constants/html-classnames.js";
import { getChildById } from "./custom-dom-handler.js";

const getStationSelectorOptions = (lineIndex) => {
  const stationList = new StationManager().stationList;
  const section = new LineManager().lineList[lineIndex].section;
  let optionsHTML = "<option value='.'>--선택--</option>";
  optionsHTML += stationList
    .map((_station) => {
      if (!section.find((_inSection) => _inSection === _station)) {
        return `<option value=${_station}>${_station}</option>`;
      }
    })
    .join("\n");

  return optionsHTML;
};

const renderSectionRegisterForm = ($selectedLineManager, lineIndex) => {
  const selectedLine = new LineManager().lineList[lineIndex];
  $selectedLineManager.innerHTML = `
    <h3 class=${LINE_SELECT_HEADER}>${selectedLine.name} 관리</h3>
    <h4>구간 등록</h4>
    <select id=${SELECTORS_ID.sectionStationSelector}>
      ${getStationSelectorOptions(lineIndex)}
    </select>
    <input 
      type="text" id=${INPUT_FORM_ID.sectionOrderInput} placeholder="순서" />
    <button id=${ADD_BUTTONS_ID.sectionAddButton}>등록</button>
  `;
};

const renderSelectedLineManager = ($selectedLineManager, lineIndex) => {
  renderSectionRegisterForm($selectedLineManager, lineIndex);
  document
    .getElementById("section-station-selector")
    .addEventListener("focus", () => {
      console.log(document.getElementById("section-station-selector"));
    });
};

const selectedLineManagerHandler = (e) => {
  const $selectedLineManager = getChildById(
    e.target.parentElement.parentElement,
    SECTION_MANAGER_CONTAINERS_ID.selectedLineManager
  );
  renderSelectedLineManager(
    $selectedLineManager,
    e.target.dataset.selectedLineIndex
  );
};

export default function sectionManagerClickHandler(e) {
  if (e.target.className === SECTION_LINE_MENU_BUTTON) {
    selectedLineManagerHandler(e);
  }
}
