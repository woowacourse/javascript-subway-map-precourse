import { clearPage } from './utils.js';

const app = document.getElementById('app');

export const initMapManager = () => {
  clearPage();
  createResultArea();
};

const createResultArea = () => {
  const resultArea = document.createElement('div');
  resultArea.setAttribute('class', 'map');

  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines) {
    Object.entries(currLines).map(([line, stations]) => {
      const lineTitle = document.createElement('h3');
      lineTitle.innerHTML = line;
      const stationList = document.createElement('ul');

      stations.map(station => {
        const stationItem = document.createElement('li');
        stationItem.innerHTML = station;
        stationList.appendChild(stationItem);
      });

      resultArea.appendChild(lineTitle);
      resultArea.appendChild(stationList);
    });

    app.appendChild(resultArea);
  }
};
