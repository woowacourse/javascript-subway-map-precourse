import {
  MANAGER_PAGES_ID,
  SELECTORS_ID,
  INPUT_FORM_ID,
} from "../html-constants/html-id-values.js";

export const getChildById = (parent, id) => {
  const childrenList = parent.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

export const turnOnNoDataMessage = ($table, $noDataMessage) => {
  $table.style.display = "none";
  $noDataMessage.style.display = "block";
};

export const turnOffNoDataMessage = ($table, $noDataMessage) => {
  $table.style.display = "";
  $noDataMessage.style.display = "none";
};

export const getStationNameInput = (appContainer) => {
  const $stationNameLabel = getChildById(
    appContainer,
    MANAGER_PAGES_ID.stationManager
  ).getElementsByTagName("label")[0];

  return getChildById($stationNameLabel, INPUT_FORM_ID.stationNameInput);
};

export const getLineNameInput = (appContainer) => {
  const $lineNameLabel = getChildById(
    appContainer,
    MANAGER_PAGES_ID.lineManager
  ).getElementsByTagName("label")[0];

  return getChildById($lineNameLabel, INPUT_FORM_ID.lineNameInput);
};

export const getStartStationSelector = (appContainer) => {
  const $startSationLabel = getChildById(
    appContainer,
    MANAGER_PAGES_ID.lineManager
  ).getElementsByTagName("label")[1];

  return getChildById($startSationLabel, SELECTORS_ID.lineStartStation);
};

export const getEndStationSelector = (appContainer) => {
  const $endSationLabel = getChildById(
    appContainer,
    MANAGER_PAGES_ID.lineManager
  ).getElementsByTagName("label")[2];

  return getChildById($endSationLabel, SELECTORS_ID.lineEndStation);
};
