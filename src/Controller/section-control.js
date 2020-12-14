import {
  $sectionAddButton,
  $sectionOrderInput,
  $sectionSelector,
  $sectionEditContainer,
  $lineContainer,
} from '../View/element.js';
import {
  addLineTitle,
  addStationSelectOption,
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
import {KEY} from './utils.js';

export function onLoadSection(e) {
  hideSectionLine();
  addLineTitle(e.target.dataset.line);
  showSectionScreen(e.target.dataset.line);
  $sectionAddButton.dataset.line = e.target.dataset.line;
}

export function onAddSection(e) {
  const sectionValue = getSectionValue(e.target.dataset.line);
  const selectedSection = getSelectedSection(sectionValue.lineName);
  if (isSectionValid(sectionValue, selectedSection.station)) {
    addSectionOnLocalStorage(KEY.LINE, sectionValue);
    lineInstance.updateAddLine(selectedSection, sectionValue);
    updateSectionTable();
    showSectionScreen(e.target.dataset.line);
  }
  $sectionOrderInput.value = '';
}

export function onRemoveSection(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  const parsedData = JSON.parse(e.target.dataset.sectionLine);
  const removedData = {lineName: parsedData.line, station: parsedData.station};
  const selectedSection = getSelectedSection(removedData.lineName);
  if (removeConfirm && isMoreThanTwoStation(selectedSection.station)) {
    removeSectionOnLocalStorage(KEY.LINE, removedData);
    lineInstance.updateRemoveLine(selectedSection, parsedData.station);
    updateSectionTable();
    showSectionScreen(parsedData.line);
  }
}

export const loadSectionTable = () => {
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) =>
    addStationSelectOption($sectionSelector, station),
  );
  lineInstance.lines.forEach((section) => {
    addSectionScreen(section);
  });
};

export const loadSectionButton = () => {
  lineInstance.loadLine();
  lineInstance.lines.forEach((section) => {
    addSectionButton(section.lineName);
  });
};

export const updateSectionTable = () => {
  removeTableScreen($sectionEditContainer);
  removeTableScreen($lineContainer);
  removeAllMapPrint();
  lineInstance.lines.forEach((section) => {
    addLineScreen(section);
    addSectionScreen(section);
  });
  addMapPrint(lineInstance.lines);
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
    (section) => section.lineName === lineName,
  );

  return lineInstance.lines[sectionIndex];
};
