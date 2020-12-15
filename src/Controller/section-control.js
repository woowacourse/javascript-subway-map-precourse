import {
  $sectionAddButton,
  $sectionOrderInput,
  $sectionSelector,
  $sectionEditContainer,
  $lineContainer,
} from '../View/element.js';
import {
  addLineTitle,
  addSelectorOption,
  addSectionScreen,
  addSectionButton,
  addLineScreen,
  addMapPrint,
} from '../View/add-screen.js';
import {removeAllMapPrint, removeTableScreen} from '../View/remove-screen.js';
import {showSectionScreen} from '../View/show-screen.js';
import {hideSectionLine} from '../View/hide-screen.js';
import {isSectionValid, isMoreThanTwoStation} from './valid.js';
import {
  addSectionOnLocalStorage,
  removeSectionOnLocalStorage,
} from './local-storage.js';
import {stationInstance, lineInstance} from '../index.js';
import {
  setLineButtonDeleteEvent,
  setSectionButtonDeleteEvent,
  setSectionButtonLoadEvent,
} from './set-button-event.js';
import {KEY, TEXT} from '../constant.js';

export function onLoadSection(e) {
  hideSectionLine();
  addLineTitle(e.target.dataset.lineName);
  showSectionScreen(e.target.dataset.lineName);
  $sectionAddButton.dataset.lineName = e.target.dataset.lineName;
}

export const onAddSection = (e) => {
  const sectionValue = getSectionValue(e.target.dataset.lineName);
  const selectedSection = getSelectedSection(sectionValue.lineName);
  if (isSectionValid(sectionValue, selectedSection.station)) {
    addSectionOnLocalStorage(KEY.LINE, sectionValue);
    lineInstance.updateAddLine(selectedSection, sectionValue);
    updateSectionTable();
    showSectionScreen(e.target.dataset.lineName);
  }
  $sectionOrderInput.value = '';
};

export function onRemoveSection(e) {
  const removeConfirm = confirm(TEXT.CONFIRM_DELETE);
  const parsedData = JSON.parse(e.target.dataset.sectionLine);
  const removedData = getRemovedData(parsedData);
  const selectedSection = getSelectedSection(removedData.lineName);
  if (removeConfirm && isMoreThanTwoStation(selectedSection.station)) {
    removeSectionOnLocalStorage(KEY.LINE, removedData);
    lineInstance.updateRemoveLine(selectedSection, parsedData.station);
    updateSectionTable();
    showSectionScreen(parsedData.lineName);
  }
}

export const loadSectionTable = () => {
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) =>
    addSelectorOption($sectionSelector, station),
  );
  lineInstance.lines.forEach((line) => {
    addSectionScreen(line);
    setSectionButtonLoadEvent(line.lineName);
    setSectionButtonDeleteEvent(line);
  });
};

export const loadSectionButton = () => {
  lineInstance.loadLine();
  lineInstance.lines.forEach((line) => {
    addSectionButton(line.lineName);
  });
};

export const updateSectionTable = () => {
  removeTableScreen($sectionEditContainer);
  removeTableScreen($lineContainer);
  removeAllMapPrint();
  lineInstance.lines.forEach((line) => {
    addLineScreen(line);
    addSectionScreen(line);
    setLineButtonDeleteEvent(line.lineName);
    setSectionButtonDeleteEvent(line);
  });
  addMapPrint(lineInstance.lines);
};

const getRemovedData = (data) => {
  return {
    lineName: data.lineName,
    station: data.station,
  };
};

const getSectionValue = (lineName) => {
  return {
    lineName,
    sectionName: $sectionSelector.value,
    number: $sectionOrderInput.value,
  };
};

const getSelectedSection = (lineName) => {
  const sectionIndex = lineInstance.lines.findIndex(
    (line) => line.lineName === lineName,
  );

  return lineInstance.lines[sectionIndex];
};
