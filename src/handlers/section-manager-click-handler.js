import StationManager from "../station-manager.js";
import LineManager from "../line-manager.js";
import {
  SECTION_MANAGER_CONTAINERS_ID,
  SELECTORS_ID,
  TBODY_ID,
} from "../html-constants/html-id-values.js";
import {
  SECTION_LINE_MENU_BUTTON,
  DELETE_BUTTONS_CLASS,
} from "../html-constants/html-classnames.js";
import { getChildById } from "./custom-dom-handler.js";

const renderSelectedLineManagerHeader = ($selectedLineManager, lineIndex) => {
  const header = getChildById(
    $selectedLineManager,
    SECTION_MANAGER_CONTAINERS_ID.selectedLineManagerHeader
  );
  const lineName = new LineManager().lineList[lineIndex].name;
  header.innerHTML = `${lineName} 관리`;
};

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

const renderLineSectionTbody = (currentLine) => {
  const $tbody = document.getElementById(TBODY_ID.lineSectionTbody);
  $tbody.innerHTML = currentLine.section
    .map((_station, _index) => {
      return `
        <tr data-line-name=${currentLine.name}>
          <td>${_index}</td>
          <td>${_station}</td>
          <td><button 
            class=${DELETE_BUTTONS_CLASS.sectoinDeleteButton}
            data-section-index=${_index}>노선에서 제거</button>
        </tr>
      `;
    })
    .join("\n");
};

const showSelectedLineManager = ($selectedLineManager, lineIndex) => {
  $selectedLineManager.style.display = "block";
  renderSelectedLineManagerHeader($selectedLineManager, lineIndex);
  renderStationSelectorOptions(
    getChildById($selectedLineManager, SELECTORS_ID.sectionStationSelector),
    lineIndex
  );
  renderLineSectionTbody(new LineManager().lineList[lineIndex]);
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
