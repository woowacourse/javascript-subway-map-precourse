import { printStations } from '../print.js';
import { setStation, getStation } from './stationDataHandler.js';
import { addEventToCreateStationBtn, addEventToDeleteBtn } from '../event.js';
import { clearInput } from '../inputHandler.js';

export default class Station {
  constructor() {
    printStations();
    addEventToCreateStationBtn();
    addEventToDeleteBtn('#station-list');
  }

  static createStation() {
    const stationNameInput = document.querySelector('#station-name-input');
    const station = stationNameInput.value;
    const stations = getStation();
    stations.push(station);
    setStation(stations);
    clearInput(stationNameInput);
  }
}
