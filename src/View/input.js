import {
  onChangeScreen,
  onAddStation,
  onRemoveStation,
  onAddLine,
  onRemoveLine,
  onLoadSection,
} from '../index.js';

export const $screenButton = document.body.querySelectorAll('#app > button');
export const $stationContainer = document.body.querySelector('#station');
export const $lineContainer = document.body.querySelector('#line');
export const $sectionContainer = document.body.querySelector('#subway-section');
export const $mapContainer = document.body.querySelector('#map-section');
export const $subwaySectionContainer = document.body.querySelector(
  '#subway-section-edit',
);
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
export const $sectionStation = document.body.querySelector(
  '#section-station-selector',
);
export const $lineAddButton = document.body.querySelector('#line-add-button');
export const $lineNameInput = document.body.querySelector('#line-name-input');

export const setButtonOption = (value, button) => {
  if (button.className === 'station-delete-button') {
    button.dataset.station = value;
    return button.addEventListener('click', onRemoveStation);
  }
  if (button.className === 'line-delete-button') {
    button.dataset.line = value;
    return button.addEventListener('click', onRemoveLine);
  }
  if (button.className === 'section-line-menu-button') {
    button.dataset.section = value;
    return button.addEventListener('click', onLoadSection);
  }
};

$screenButton.forEach((button) =>
  button.addEventListener('click', onChangeScreen),
);

$stationAddButton.addEventListener('click', onAddStation);

$lineAddButton.addEventListener('click', onAddLine);
