import { addStation } from '../views/stationManager.js';
import { loadData } from './storage.js';

export const stationAddListener = () => {
  const stationManagerInput = document.querySelector('#station-name-input');
  const stationAddBtn = document.querySelector('#station-add-button');
  const stationList = ['asdf', 'asdsf', 'qwf']; //localStorage 불러오기

  stationAddBtn.addEventListener('click', () => addStation(stationManagerInput.value, stationList));
  stationManagerInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      addStation(stationManagerInput.value, stationList);
    }
  });
};
