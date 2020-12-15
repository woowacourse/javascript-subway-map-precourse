import {
  $stationNameInput,
  $upStreamSelector,
  $downStreamSelector,
  $sectionSelector,
} from '../View/element.js';
import {addStationScreen, addSelectorOption} from '../View/add-screen.js';
import {
  removeStationScreen,
  removeSelectorOption,
} from '../View/remove-screen.js';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './local-storage.js';
import {isNotLineHaved, isStationInputVaild} from './valid.js';
import {stationInstance, lineInstance} from '../index.js';
import {KEY, TEXT} from './constant.js';

export const loadStation = () => {
  const stations = getLocalStorage(KEY.STATION);
  stationInstance.loadStation(stations);
  stationInstance.stations.forEach((station) => addStationScreen(station));
};

export function onAddStation() {
  if (isStationInputVaild($stationNameInput.value, stationInstance.stations)) {
    setLocalStorage(KEY.STATION, $stationNameInput.value);
    stationInstance.addStation($stationNameInput.value);
    addStationScreen($stationNameInput.value);
    addSelectorOption($upStreamSelector, $stationNameInput.value);
    addSelectorOption($downStreamSelector, $stationNameInput.value);
    addSelectorOption($sectionSelector, $stationNameInput.value);
  }
  $stationNameInput.value = '';
}

export function onRemoveStation(e) {
  const removeConfirm = confirm(TEXT.CONFIRM_DELETE);
  if (
    removeConfirm &&
    isNotLineHaved(e.target.dataset.stationName, lineInstance.lines)
  ) {
    removeLocalStorage(KEY.STATION, e.target.dataset.stationName);
    stationInstance.removeStation(e.target.dataset.stationName);
    removeStationScreen(e.target);
    removeSelectorOption($upStreamSelector, e.target.dataset.stationName);
    removeSelectorOption($downStreamSelector, e.target.dataset.stationName);
    removeSelectorOption($sectionSelector, e.target.dataset.stationName);
  }
}
