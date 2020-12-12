import Station from './Model/station.js';
import Line from './Model/line.js';
import Section from './Model/section.js';
import {hideScreen, hideSectionLine} from './View/hide-screen.js';
import {showScreen, showSectionScreen} from './View/show-screen.js';
import {
  addStationScreen,
  addStationSelectOption,
  addLineScreen,
  addSectionScreen,
  addSectionButton,
  addLineTitle,
  addMapPrint,
} from './View/add-screen.js';
import {
  removeStationSelectOption,
  removeStationScreen,
  removeLineScreen,
  removeTableScreen,
  removeSectionButton,
  removeOption,
} from './View/remove-screen.js';
import {
  $stationAddInput,
  $stationContainer,
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
  isStationInputVaild,
  isLineInputValid,
  isSectionValid,
  isNotLineHaved,
  isMoreThanTwoStation,
} from './Controller/valid.js';
import {
  setLocalStorage,
  addSectionOnLocalStorage,
  removeLocalStorage,
  removeSectionOnLocalStorage,
} from './Controller/local-storage.js';

const stationInstance = new Station();
const lineInstance = new Line();
const sectionInstance = new Section();

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
    return addMapPrint(sectionInstance.sections);
  }
}

export function onAddStation() {
  if (isStationInputVaild($stationAddInput.value, stationInstance.stations)) {
    setLocalStorage('station', $stationAddInput.value);
    stationInstance.addStation($stationAddInput.value);
    addStationScreen($stationAddInput.value);
    addStationSelectOption($upStream, $stationAddInput.value);
    addStationSelectOption($downStream, $stationAddInput.value);
    addStationSelectOption($sectionStation, $stationAddInput.value);
  }
  $stationAddInput.value = '';
}

export function onRemoveStation(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  if (
    removeConfirm &&
    isNotLineHaved(e.target.dataset.station, lineInstance.lines)
  ) {
    removeLocalStorage('station', e.target.dataset.station);
    stationInstance.removeStation(e.target.dataset.station);
    removeStationScreen(e.target);
    removeStationSelectOption($upStream, e.target.dataset.station);
    removeStationSelectOption($downStream, e.target.dataset.station);
    removeStationSelectOption($sectionStation, e.target.dataset.station);
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

export const loadStation = () => {
  removeTableScreen($stationContainer);
  stationInstance.loadStation();
  stationInstance.stations.forEach((station) => addStationScreen(station));
};

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
  sectionInstance.loadSection();
  stationInstance.stations.forEach((station) =>
    addStationSelectOption($sectionStation, station),
  );
  sectionInstance.sections.forEach((section) => {
    addSectionScreen(section);
  });
};

export const loadSectionButton = () => {
  removeSectionButton();
  sectionInstance.loadSection();
  sectionInstance.sections.forEach((section) => {
    addSectionButton(section.lineName);
  });
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
  const sectionIndex = sectionInstance.sections.findIndex(
    (section) => section.lineName === lineName,
  );

  return sectionInstance.sections[sectionIndex];
};

loadStation();
loadLine();
loadSectionTable();
