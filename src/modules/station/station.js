import { printStations } from '../util/output.js';

import {
  addEventToCreateStationBtn,
  addEventToDeleteBtn,
} from '../util/events.js';

export default class Station {
  constructor() {
    addEventToCreateStationBtn();
    addEventToDeleteBtn('#station-list');
    printStations();
  }
}
