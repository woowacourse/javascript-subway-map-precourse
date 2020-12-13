import Station from './Model/station.js';
import Line from './Model/line.js';
import {hideScreen, hideSectionLine} from './View/hide-screen.js';
import {showScreen, showSectionScreen} from './View/show-screen.js';
import {
  addStationSelectOption,
  addLineScreen,
  addSectionScreen,
  addSectionButton,
  addLineTitle,
  addMapPrint,
} from './View/add-screen.js';
import {
  removeLineScreen,
  removeTableScreen,
  removeSectionButton,
  removeOption,
  removeMapPrint,
} from './View/remove-screen.js';
import {
  $upStream,
  $downStream,
  $lineNameInput,
  $sectionStation,
  $lineContainer,
  $sectionNumber,
  $sectionLineSelect,
  $sectionAddButton,
  $sectionContainer,
  $upStreamOption,
  $downStreamOption,
  $sectionOption,
} from './View/input.js';
import {
  isLineInputValid,
  isSectionValid,
  isMoreThanTwoStation,
} from './Controller/valid.js';
import {
  setLocalStorage,
  addSectionOnLocalStorage,
  removeLocalStorage,
  removeSectionOnLocalStorage,
} from './Controller/local-storage.js';
import {loadStation} from './Controller/station-control.js';

export const stationInstance = new Station();
export const lineInstance = new Line();

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
  if (e.target.id === 'station-manager-button') {
    return loadStation();
  }
  if (e.target.id === 'line-manager-button') {
    return loadLine();
  }
  if (e.target.id === 'section-manager-button') {
    return loadSectionButton();
  }
  if (e.target.id === 'map-print-manager-button') {
    return loadMapPrint();
  }
}

export function onAddLine() {
  const lineValue = getLineValue();
  if (isLineInputValid(lineValue, lineInstance.lines)) {
    setLocalStorage('line', lineValue);
    lineInstance.addLine(lineValue);
    addLineScreen(lineValue);
  }
  $lineNameInput.value = '';
}

export function onRemoveLine(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  if (removeConfirm) {
    removeLocalStorage('line', e.target.dataset.line);
    lineInstance.removeLine(e.target.dataset.line);
    removeLineScreen(e.target);
  }
}

export function onLoadSection(e) {
  hideSectionLine();
  loadSectionTable();
  addLineTitle(e.target.dataset.line);
  showSectionScreen(e.target.dataset.line);
  $sectionAddButton.dataset.line = e.target.dataset.line;
}

export function onAddSection(e) {
  const sectionValue = getSectionValue(e.target.dataset.line);
  const selectedSection = getSelectedSection(sectionValue.lineName);
  if (isSectionValid(sectionValue, selectedSection.station)) {
    addSectionOnLocalStorage('line', sectionValue);
    loadSectionTable();
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
    loadSectionTable();
    showSectionScreen(parsedData.line);
  }
}

export const loadLine = () => {
  removeTableScreen($lineContainer);
  removeOption($upStreamOption);
  removeOption($downStreamOption);
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) => {
    addStationSelectOption($upStream, station);
    addStationSelectOption($downStream, station);
  });
  lineInstance.lines.forEach((line) => {
    addLineScreen(line);
  });
};

export const loadSectionTable = () => {
  removeTableScreen($sectionContainer);
  removeOption($sectionOption);
  lineInstance.loadLine();
  stationInstance.stations.forEach((station) =>
    addStationSelectOption($sectionStation, station),
  );
  lineInstance.lines.forEach((section) => {
    addSectionScreen(section);
  });
};

export const loadSectionButton = () => {
  removeSectionButton();
  lineInstance.loadLine();
  lineInstance.lines.forEach((section) => {
    addSectionButton(section.lineName);
  });
};

export const loadMapPrint = () => {
  removeMapPrint();
  lineInstance.loadLine();
  addMapPrint(lineInstance.lines);
};

const getLineValue = () => {
  return {
    lineName: $lineNameInput.value,
    station: [$upStream.value, $downStream.value],
  };
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

loadStation();
loadLine();
loadSectionTable();
