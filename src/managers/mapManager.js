import { clearPage } from '../utils/utils.js';
import { getLocalStorage } from '../utils/storage.js';
import { mapText as T } from '../utils/constants.js';

const app = document.getElementById('app');
const STORAGE_KEY_LINE = 'lines';

export const initMapManager = () => {
  clearPage();
  createResultArea();
};

const createResultArea = () => {
  const resultArea = document.createElement('div');
  resultArea.setAttribute('class', T.RESULT_AREA_CLASS);

  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (lines) {
    printResult(resultArea, lines);
  }
};

const printResult = (resultArea, data) => {
  Object.entries(data).map(([line, stations]) => {
    const lineTitle = document.createElement('h3');
    lineTitle.innerHTML = line;
    const stationList = document.createElement('ul');

    stations.map(station => {
      const stationItem = document.createElement('li');
      stationItem.innerHTML = station;
      stationList.append(stationItem);
    });

    resultArea.append(lineTitle, stationList);
  });

  app.append(resultArea);
};
