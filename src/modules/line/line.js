import { setLine } from './lineDataHandler.js';

import Subway from '../subwayManager.js';
import {
  addEventToCreateLineBtn,
  addEventToDeleteBtn,
} from '../util/events.js';

export default class Line {
  constructor() {
    addEventToCreateLineBtn();
    addEventToDeleteBtn('#line-list');
  }

  static createLine() {
    const lineNameInput = document.querySelector('#line-name-input');
    const startStation = document.querySelector('#line-start-station-selector')
      .value;
    const endStation = document.querySelector('#line-end-station-selector')
      .value;
    setLine(lineNameInput.value, [startStation, endStation]);
    Subway.clearInput(lineNameInput);
  }
}
