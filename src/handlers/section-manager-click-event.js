import StationManager from "../station-manager.js";
import LineManager from "../line-manager.js";
import {
  SECTION_MANAGER_CONTAINERS_ID,
  SELECTORS_ID,
} from "../html-constants/html-id-values.js";
import { SECTION_LINE_MENU_BUTTON } from "../html-constants/html-classnames.js";
import { getChildById } from "./custom-dom-handler.js";

const renderStationSelectorOptions = ($select, lineIndex) => {
  const stationList = new StationManager().stationList;
  const section = new LineManager().lineList[lineIndex].section;
  $select.innerHTML = "<option value='.'>--선택--</option>";
  $select.innerHTML += stationList
    .map((_station) => {
      if (!section.find((_inSection) => _inSection === _station)) {
        return `<option value=${_station}>${_station}</option>`;
      }
    })
    .join("\n");
};

const showSelectedLineManager = ($selectedLineManager, lineIndex) => {
  $selectedLineManager.style.display = "block";
  renderStationSelectorOptions(
    getChildById($selectedLineManager, SELECTORS_ID.sectionStationSelector),
    lineIndex
  );
};

const selectedLineManagerHandler = (e) => {
  const $selectedLineManager = getChildById(
    e.target.parentElement.parentElement,
    SECTION_MANAGER_CONTAINERS_ID.selectedLineManager
  );
  showSelectedLineManager(
    $selectedLineManager,
    e.target.dataset.selectedLineIndex
  );
};

export default function sectionManagerClickHandler(e) {
  if (e.target.className === SECTION_LINE_MENU_BUTTON) {
    selectedLineManagerHandler(e);
  }
}
