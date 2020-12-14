import { printStations } from './print.js';
import { setItem, getItem, deleteItem } from './localStorage.js';
import { addEventToDeleteBtn } from './eventHandler.js';
import { clearInput } from './inputHandler.js';

export default class Station {
  constructor() {
    setItem([]);
    addEventToDeleteBtn();
  }

  createStation() {
    const stationNameInput = document.querySelector('#station-name-input');
    const station = stationNameInput.value;
    const stations = getItem('stations');
    stations.push(station);
    setItem(stations);
    clearInput(stationNameInput);
  }

  static readStation() {
    printStations();
  }

  static deleteStation(e) {
    const station = e.target.dataset.station;
    deleteItem(station);
  }
}
