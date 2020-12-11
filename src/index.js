import {hideScreen} from './View/hide-screen.js';
import {showScreen} from './View/show-screen.js';
import {addStationScreen} from './View/add-screen.js';
import {removeStationScreen} from './View/remove-screen.js';
import {$stationAddInput} from './View/input.js';
import {isInputValid} from './Controller/valid.js';
import {
  setLocalStorage,
  removeLocalStorage,
} from './Controller/local-storage.js';

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
}

export function onAddStation() {
  if (isInputValid($stationAddInput.value)) {
    setLocalStorage('station', $stationAddInput.value);
    addStationScreen($stationAddInput.value);
  }
  $stationAddInput.value = '';
}

export function onRemoveStation(e) {
  removeLocalStorage('station', e.target.dataset.station);
  removeStationScreen(e.target);
}
