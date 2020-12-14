import Station from './station.js';

export const addEventToCreateStationBtn = () => {
  const createStationBtn = document.querySelector('#station-add-button');
  createStationBtn.addEventListener('click', () => {
    Station.createStation();
  });
};

export const addEventToDeleteBtn = () => {
  const tableBody = document.querySelector('#station-list');
  tableBody.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'INPUT';
    if (!isButton) {
      return;
    }
    Station.deleteStation(event);
  });
};
