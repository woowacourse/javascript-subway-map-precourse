import { printStations } from './print.js';
import { setItem, getItem, deleteItem } from './localStorage.js';
import {
  addEventToCreateStationBtn,
  addEventToDeleteBtn,
} from './eventHandler.js';
import { clearInput } from './inputHandler.js';

export default class Station {
  constructor() {
    printStations();
    addEventToCreateStationBtn();
    addEventToDeleteBtn();
  }

  static createStation() {
    const stationNameInput = document.querySelector('#station-name-input');
    const station = stationNameInput.value;
    const stations = getItem('stations');
    stations.push(station);
    setItem(stations);
    clearInput(stationNameInput);
  }

  static deleteStation(e) {
    const station = e.target.dataset.station;
    deleteItem(station);
  }
}
