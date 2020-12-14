import { printStations } from './print.js';
import { setItem, getItem, deleteItem } from './localStorage.js';
import { addEventToDeleteBtn } from './eventHandler.js';

export default class Station {
  constructor() {
    setItem([]);
    addEventToDeleteBtn();
  }

  createStation() {
    const station = document.querySelector('#station-name-input').value;
    const stations = getItem('stations');
    stations.push(station);
    setItem(stations);
  }

  static readStation() {
    printStations();
  }

  static deleteStation(e) {
    const station = e.target.dataset.station;
    deleteItem(station);
  }
}
