import {
  makeTable,
  getLocalStorageByKey,
  emptyElement,
} from '../util/utilUI.js';
import { Station } from '../classes/station.js';

export const requestToAdd = () => {
  const container = document.getElementById('container');
  const stationNameInput = document.getElementById('station-name-input');
  const station = new Station(stationNameInput.value);
  const error = station.unableToAdd();

  if (error) {
    emptyElement(stationNameInput);
    stationNameInput.focus();
    return alert(error);
  }
  addStation(station, container.dataset.menu);
  refreshTable(container.dataset.index, container.dataset.menu);
  emptyElement(stationNameInput);
};

const addStation = (station, menu) => {
  let stationList = getLocalStorageByKey(menu);

  stationList.push(station);
  localStorage.setItem(menu, JSON.stringify(stationList));
};

const refreshTable = (index, menu) => {
  const tableElement = document.getElementById(`${menu}-list`);

  tableElement.innerHTML = makeTable(
    index,
    JSON.parse(localStorage.getItem(menu))
  );
};
