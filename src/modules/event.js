import Station from './station/station.js';
import Line from './line/line.js';
import { deleteStation } from './station/stationDataHandler.js';
import { deleteLine } from './line/lineDataHandler.js';

export const addEventToCreateStationBtn = () => {
  const createStationBtn = document.querySelector('#station-add-button');
  createStationBtn.addEventListener('click', () => {
    Station.createStation();
  });
};

export const addEventToDeleteBtn = (listId) => {
  const tableBody = document.querySelector(listId);
  tableBody.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    if (listId === '#station-list') {
      return deleteStation(event);
    }
    return deleteLine(event);
  });
};

export const addEventToCreateLineBtn = () => {
  const createLineBtn = document.querySelector('#line-add-button');
  createLineBtn.addEventListener('click', () => {
    Line.createLine();
  });
};
