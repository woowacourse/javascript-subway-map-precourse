import {
  $sectionAddButton,
  $sectionNumber,
  $sectionStation,
  $sectionLineSelect,
  $subwaySectionContainer,
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
    addSectionOnLocalStorage('line', sectionValue);
    lineInstance.updateLine(selectedSection, sectionValue);
    updateSectionTable();
    showSectionScreen(e.target.dataset.line);
  }
  $sectionNumber.value = '';
}

export function onRemoveSection(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  const parsedData = JSON.parse(e.target.dataset.sectionLine);
  const removedData = {lineName: parsedData.line, station: parsedData.station};
  const selectedSection = getSelectedSection(removedData.lineName);
  if (removeConfirm && isMoreThanTwoStation(selectedSection.station)) {
    removeSectionOnLocalStorage('line', removedData);
    showSectionScreen(parsedData.line);
  }
}

export const loadSectionTable = () => {
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) =>
    addStationSelectOption($sectionStation, station),
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
  removeTableScreen($subwaySectionContainer);
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
    sectionName: $sectionLineSelect.value,
    number: $sectionNumber.value,
  };
};

const getSelectedSection = (lineName) => {
  const sectionIndex = lineInstance.lines.findIndex(
    (section) => section.lineName === lineName,
  );

  return lineInstance.lines[sectionIndex];
};
