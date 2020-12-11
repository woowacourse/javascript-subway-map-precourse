import {hideScreen} from './View/hide-screen.js';
import {showScreen} from './View/show-screen.js';
import {addStationScreen} from './View/add-screen.js';
import {removeStationScreen} from './View/remove-screen.js';
import {$stationAddInput} from './View/input.js';
import {isInputValid} from './Controller/valid.js';

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
}

export function onAddStation() {
  if (isInputValid($stationAddInput.value)) {
    setLocalStorage('station');
    addStationScreen($stationAddInput.value);
  }
  $stationAddInput.value = '';
}

export function onRemoveStation(e) {
  removeLocalStorage('station', e.target.dataset.station);
  removeStationScreen(e.target);
}

export const setLocalStorage = (key) => {
  const localStorageValue = getLocalStorage(key);
  if (localStorageValue === null) {
    return localStorage.setItem(key, JSON.stringify([$stationAddInput.value]));
  }

  return localStorage.setItem(
    key,
    JSON.stringify([...localStorageValue, $stationAddInput.value]),
  );
};

export const removeLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  const filteredStorage = localStorageValue.filter(
    (station) => station !== value,
  );

  return localStorage.setItem(key, JSON.stringify(filteredStorage));
};

export const getLocalStorage = (key) => {
  const localStorageValue = JSON.parse(localStorage.getItem(key));

  return localStorageValue;
};
