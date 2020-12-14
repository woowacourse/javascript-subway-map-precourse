import { printLines } from '../util/output.js';
import { loadStationData } from './lineDataHandler.js';

export const setStationDataToOption = (stations, selector) => {
  for (let i = 0; i < stations.length; i++) {
    let option = document.createElement('option');
    option.className = 'start-end-stations';
    option.text = stations[i];
    selector.add(option);
  }
};

export const deleteOption = () => {
  const options = document.querySelectorAll('.start-end-stations');
  if (options) {
    options.forEach((option) => {
      option.remove();
    });
  }
};

export const refreshLineModule = () => {
  deleteOption();
  loadStationData();
  printLines();
};
