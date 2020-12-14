import {
  $stationNameInput,
  $upStreamSelector,
  $downStreamSelector,
  $sectionSelector,
} from '../View/element.js';
import {addStationScreen, addStationSelectOption} from '../View/add-screen.js';
import {
  removeStationScreen,
  removeStationSelectOption,
} from '../View/remove-screen.js';
import {setLocalStorage, removeLocalStorage} from './local-storage.js';
import {isNotLineHaved, isStationInputVaild} from './valid.js';
import {stationInstance, lineInstance} from '../index.js';
import {KEY, TEXT} from './utils.js';

export const loadStation = () => {
  stationInstance.loadStation();
  stationInstance.stations.forEach((station) => addStationScreen(station));
};

export function onAddStation() {
  if (isStationInputVaild($stationNameInput.value, stationInstance.stations)) {
    setLocalStorage(KEY.STATION, $stationNameInput.value);
    stationInstance.addStation($stationNameInput.value);
    addStationScreen($stationNameInput.value);
    addStationSelectOption($upStreamSelector, $stationNameInput.value);
    addStationSelectOption($downStreamSelector, $stationNameInput.value);
    addStationSelectOption($sectionSelector, $stationNameInput.value);
  }
  $stationNameInput.value = '';
}

export function onRemoveStation(e) {
  const removeConfirm = confirm(TEXT.CONFIRM_DELETE);
  if (
    removeConfirm &&
    isNotLineHaved(e.target.dataset.station, lineInstance.lines)
  ) {
    removeLocalStorage(KEY.STATION, e.target.dataset.station);
    stationInstance.removeStation(e.target.dataset.station);
    removeStationScreen(e.target);
    removeStationSelectOption($upStreamSelector, e.target.dataset.station);
    removeStationSelectOption($downStreamSelector, e.target.dataset.station);
    removeStationSelectOption($sectionSelector, e.target.dataset.station);
  }
}
