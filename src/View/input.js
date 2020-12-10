import {hideScreen} from './hide-screen.js';
import {showScreen} from './show-screen.js';

export const $screenButton = document.body.querySelectorAll('#app > button');
export const $stationContainer = document.body.querySelector('#station');
export const $lineContainer = document.body.querySelector('#line');
export const $sectionContainer = document.body.querySelector('#subway-section');
export const $mapContainer = document.body.querySelector('#map-section');

Array.from($screenButton).forEach((button) =>
  button.addEventListener('click', (e) => {
    hideScreen();
    showScreen(e);
  }),
);
