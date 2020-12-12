import StationManager from "../station-manager.js";
import LineManager from "../line-manager.js";
import {
  getChildById,
  getStartStationSelector,
  getEndStationSelector,
} from "./custom-dom-handler.js";
import {
  MENU_BUTTONS_ID,
  MANAGER_PAGES_ID,
  SECTION_MANAGER_CONTAINERS_ID,
} from "../html-constants/html-id-values.js";
import { SECTION_LINE_MENU_BUTTON } from "../html-constants/html-classnames.js";

const showManagerPageById = (container, id) => {
  Object.values(MANAGER_PAGES_ID).forEach((_pageId) => {
    if (_pageId === id) {
      getChildById(container, _pageId).style.display = "block";
    } else {
      getChildById(container, _pageId).style.display = "none";
    }
  });
};

const setSelectorOptions = ($selector, exceptionalOption = "") => {
  $selector.innerHTML = `<option value="">--선택--</option>`;
  new StationManager().stationList.forEach((_station) => {
    if (_station !== exceptionalOption) {
      $selector.innerHTML += `
        <option value=${_station}>${_station}</option>
      `;
    }
  });
};

const setEndStationSelector = (appContainer) => {
  const $startStationSelector = getStartStationSelector(appContainer);
  const $endStationSelector = getEndStationSelector(appContainer);
  const startStation = $startStationSelector.value;
  if (startStation === "") {
    $endStationSelector.innerHTML = "";
  } else {
    setSelectorOptions($endStationSelector, startStation);
  }
};

const setStartStationSelector = (appContainer) => {
  const $startStationSelector = getStartStationSelector(appContainer);
  const $endStationSelector = getEndStationSelector(appContainer);
  setSelectorOptions($startStationSelector);
  $endStationSelector.innerHTML = "";
  $startStationSelector.onchange = () => setEndStationSelector(appContainer);
};

const fillSectionLineMenuButtons = ($lineSelectButtons, lineList) => {
  $lineSelectButtons.innerHTML = lineList
    .map((_line, _index) => {
      return `
        <button class=${SECTION_LINE_MENU_BUTTON} data-selected-line-index=${_index}>
          ${_line.name}
        </button>
      `;
    })
    .join("");
};

const renderLineSelectButtons = ($sectionManager) => {
  const $sectionLineMenuButtons = getChildById(
    $sectionManager,
    SECTION_MANAGER_CONTAINERS_ID.sectionLineMenuButtons
  );
  const lineList = new LineManager().lineList;
  if (lineList.length === 0) {
    $sectionLineMenuButtons.innerHTML = "노선이 존재하지 않습니다.";
  } else {
    fillSectionLineMenuButtons($sectionLineMenuButtons, lineList);
  }
};

const hideSelectedLineManager = ($sectionManager) => {
  getChildById(
    $sectionManager,
    SECTION_MANAGER_CONTAINERS_ID.selectedLineManager
  ).style.display = "none";
};

const getMapElementString = (line) => {
  return `
    <div class="map">
      <h2 style="font-size: 1.1rem;">${line.name}</h2>
      <ul>
        ${line.section
          .map((_station) => {
            return `<li>${_station}</li>`;
          })
          .join("\n")}
      </ul>
    </div>
  `;
};

const renderMap = ($mapPrintManager, lineList) => {
  $mapPrintManager.innerHTML = "";
  lineList.forEach((_line) => {
    $mapPrintManager.innerHTML += getMapElementString(_line);
  });
};

const showStationManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.stationManager);
  new StationManager().renderStationNameTable();
};

const showLineManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.lineManager);
  setStartStationSelector(appContainer);
  new LineManager().renderLineNameTable();
};

const showSectionManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.sectionManager);
  const $sectionManager = getChildById(
    appContainer,
    MANAGER_PAGES_ID.sectionManager
  );
  renderLineSelectButtons($sectionManager);
  hideSelectedLineManager($sectionManager);
};

const showMapPrintManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.mapPrintManager);
  const lineList = new LineManager().lineList;
  const $mapPrintManager = getChildById(
    appContainer,
    MANAGER_PAGES_ID.mapPrintManager
  );
  if (lineList.length === 0) {
    $mapPrintManager.innerHTML = "노선이 존재하지 않습니다.";
  } else {
    renderMap($mapPrintManager, lineList);
  }
};

export default function menuButtonHandler(e) {
  const app = e.target.closest("#app");
  const id = e.target.id;
  if (id === MENU_BUTTONS_ID.stationManagerButton) {
    showStationManagerPage(app);
  } else if (id === MENU_BUTTONS_ID.lineManagerButton) {
    showLineManagerPage(app);
  } else if (id === MENU_BUTTONS_ID.sectionManagerButton) {
    showSectionManagerPage(app);
  } else if (id === MENU_BUTTONS_ID.mapPrintManagerButton) {
    showMapPrintManagerPage(app);
  }
}
