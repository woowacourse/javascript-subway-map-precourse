import Station from './Model/station.js';
import Line from './Model/line.js';
import {hideScreen} from './View/hide-screen.js';
import {showScreen} from './View/show-screen.js';
import {
  addStationScreen,
  addLastStopScreen,
  addLineScreen,
} from './View/add-screen.js';
import {
  removeLastStopScreen,
  removeStationScreen,
} from './View/remove-screen.js';
import {
  $stationAddInput,
  $upStream,
  $downStream,
  $lineNameInput,
} from './View/input.js';
import {isInputValid} from './Controller/valid.js';
import {
  setLocalStorage,
  removeLocalStorage,
} from './Controller/local-storage.js';

const stationInstance = new Station();
const lineInstance = new Line();

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
}

export function onAddStation() {
  if (isInputValid($stationAddInput.value, stationInstance.stations)) {
    setLocalStorage('station', $stationAddInput.value);
    stationInstance.addStation($stationAddInput.value);
    addStationScreen($stationAddInput.value);
    addLastStopScreen($stationAddInput.value);
  }
  $stationAddInput.value = '';
}

export function onRemoveStation(e) {
  const removeConfirm = confirm('정말로 삭제하시겠습니까?');
  if (removeConfirm) {
    removeLocalStorage('station', e.target.dataset.station);
    stationInstance.removeStation(e.target.dataset.station);
    removeStationScreen(e.target);
    removeLastStopScreen(e.target.dataset.station);
  }
}

export function onAddLine() {
  const lineValue = getLineValue();
  setLocalStorage('line', lineValue);
  lineInstance.addLine(lineValue);
  addLineScreen(lineValue);
}

export const loadStation = () => {
  stationInstance.loadStation();
  stationInstance.stations.forEach((station) => {
    addStationScreen(station);
    addLastStopScreen(station);
  });
};

const getLineValue = () => {
  return {
    lineName: $lineNameInput.value,
    upStream: $upStream.value,
    downStream: $downStream.value,
  };
};

loadStation();
