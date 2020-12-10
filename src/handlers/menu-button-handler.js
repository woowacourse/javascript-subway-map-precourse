import StationManager from "../station-manager.js";
import { getChildById } from "./custom-dom-handler.js";
import {
  MENU_BUTTONS_ID,
  MANAGER_PAGES_ID,
  SELECTORS_ID,
} from "../html-constants/html-id-values.js";

const showManagerPageById = (container, id) => {
  Object.values(MANAGER_PAGES_ID).forEach((_pageId) => {
    if (_pageId === id) {
      getChildById(container, _pageId).style.display = "block";
    } else {
      getChildById(container, _pageId).style.display = "none";
    }
  });
};

const getStartStationSelector = (appContainer) => {
  const $startSationLabel = getChildById(
    appContainer,
    MANAGER_PAGES_ID.lineManager
  ).getElementsByTagName("label")[1];

  return getChildById($startSationLabel, SELECTORS_ID.lineStartStation);
};

const getEndStationSelector = (appContainer) => {
  const $endSationLabel = getChildById(
    appContainer,
    MANAGER_PAGES_ID.lineManager
  ).getElementsByTagName("label")[2];

  return getChildById($endSationLabel, SELECTORS_ID.lineEndStation);
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

const showStationManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.stationManager);
  new StationManager().renderStationNameTable();
};

const showLineManagerPage = (appContainer) => {
  showManagerPageById(appContainer, MANAGER_PAGES_ID.lineManager);
  setStartStationSelector(appContainer);
};

export default function menuButtonHandler(e) {
  const app = e.target.closest("#app");
  const id = e.target.id;
  if (id === MENU_BUTTONS_ID.stationManagerButton) {
    showStationManagerPage(app);
  } else if (id === MENU_BUTTONS_ID.lineManagerButton) {
    showLineManagerPage(app);
  } else if (id === MENU_BUTTONS_ID.sectionManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.sectionManager);
  } else if (id === MENU_BUTTONS_ID.mapPrintManagerButton) {
    showManagerPageById(app, MANAGER_PAGES_ID.mapPrintManager);
  }
}
