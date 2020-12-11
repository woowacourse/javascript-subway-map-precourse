import {
  onChangeScreen,
  onAddStation,
  onRemoveStation,
  onAddLine,
} from '../index.js';

export const $screenButton = document.body.querySelectorAll('#app > button');
export const $stationContainer = document.body.querySelector('#station');
export const $lineContainer = document.body.querySelector('#line');
export const $sectionContainer = document.body.querySelector('#subway-section');
export const $mapContainer = document.body.querySelector('#map-section');
export const $stationAddInput = document.body.querySelector(
  '#station-name-input',
);
export const $stationAddButton = document.body.querySelector(
  '#station-add-button',
);
export const $upStream = document.body.querySelector(
  '#line-start-station-selector',
);
export const $downStream = document.body.querySelector(
  '#line-end-station-selector',
);
export const $lineAddButton = document.body.querySelector('#line-add-button');
export const $lineNameInput = document.body.querySelector('#line-name-input');

export const setButtonOption = (value, button) => {
  button.dataset.station = value;
  if (button.className === 'station-delete-button') {
    return button.addEventListener('click', onRemoveStation);
  }
  if (button.className === 'line-delete-button') {
    return button.addEventListener('click', onRemoveLine);
  }
};

$screenButton.forEach((button) =>
  button.addEventListener('click', onChangeScreen),
);

$stationAddButton.addEventListener('click', onAddStation);

$lineAddButton.addEventListener('click', onAddLine);
