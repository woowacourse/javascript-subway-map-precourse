import Station from './Model/station.js';
import Line from './Model/line.js';
import Section from './Model/section.js';
import {hideScreen} from './View/hide-screen.js';
import {showScreen, showSectionScreen} from './View/show-screen.js';
import {
  addStationScreen,
  addStationSelectOption,
  addLineScreen,
  addSectionScreen,
} from './View/add-screen.js';
import {
  removeStationSelectOption,
  removeStationScreen,
  removeLineScreen,
} from './View/remove-screen.js';
import {
  $stationAddInput,
  $upStream,
  $downStream,
  $lineNameInput,
  $sectionStation,
} from './View/input.js';
import {isStationInputVaild, isLineInputValid} from './Controller/valid.js';
import {
  setLocalStorage,
  removeLocalStorage,
} from './Controller/local-storage.js';

const stationInstance = new Station();
const lineInstance = new Line();
const sectionInstance = new Section();

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
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
  if (removeConfirm) {
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
  removeLocalStorage('line', e.target.dataset.line);
  lineInstance.removeLine(e.target.dataset.line);
  removeLineScreen(e.target);
}

export function onLoadSection() {
  showSectionScreen();
}

export const loadStation = () => {
  stationInstance.loadStation();
  stationInstance.stations.forEach((station) => {
    addStationScreen(station);
    addStationSelectOption($upStream, station);
    addStationSelectOption($downStream, station);
    addStationSelectOption($sectionStation, station);
  });
};

export const loadLine = () => {
  lineInstance.loadLine();
  lineInstance.lines.forEach((line) => {
    addLineScreen(line);
  });
};

export const loadSectionTable = () => {
  sectionInstance.loadSection();
  sectionInstance.sections.forEach((section) => {
    addSectionScreen(section);
  });
};

const getLineValue = () => {
  return {
    lineName: $lineNameInput.value,
    station: [$upStream.value, $downStream.value],
  };
};

loadStation();
loadLine();
loadSectionTable();
