import { printStations } from '../util/output.js';
import { setStation, getStation } from './stationDataHandler.js';
import {
  addEventToCreateStationBtn,
  addEventToDeleteBtn,
} from '../util/events.js';
import Subway from '../subwayManagementSystem.js';

export default class Station {
  constructor() {
    addEventToCreateStationBtn();
    addEventToDeleteBtn('#station-list');
    printStations();
  }

  static createStation() {
    const stationNameInput = document.querySelector('#station-name-input');
    const station = stationNameInput.value;
    const stations = getStation();
    stations.push(station);
    setStation(stations);
    Subway.clearInput(stationNameInput);
  }
}
