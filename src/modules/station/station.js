import { setStation, getStation } from './stationDataHandler.js';
import { validateUserInput } from './stationValidator.js';

import Subway from '../subwayManager.js';
import { printStations } from '../util/output.js';
import {
  addEventToCreateStationBtn,
  addEventToDeleteBtn,
} from '../util/events.js';
import { numInCondition } from '../util/constants.js';

export default class Station {
  constructor() {
    addEventToCreateStationBtn();
    addEventToDeleteBtn('#station-list');
    printStations();
  }

  static createStation() {
    const stationNameInput = document.querySelector('#station-name-input');
    if (!validateUserInput(stationNameInput.value)) {
      alert(
        `중복되지 않은 ${numInCondition.MIN_LENGTH_STATION}글자 이상 한글 입력만 가능해요🚨`
      );
      return Subway.clearInput(stationNameInput);
    }
    const station = stationNameInput.value;
    const stations = getStation();
    stations.push(station);
    setStation(stations);
    Subway.clearInput(stationNameInput);
  }
}
