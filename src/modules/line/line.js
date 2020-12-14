import { setLine } from './lineDataHandler.js';
import { validateUserInput } from './lineValidator.js';

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
    if (!validateUserInput(lineNameInput.value, startStation, endStation)) {
      alert('노선이나 역 이름이 중복되지 않았는지 다시 한 번 확인해주세요🚨');
      return Subway.clearInput(lineNameInput);
    }
    setLine(lineNameInput.value, [startStation, endStation]);
    Subway.clearInput(lineNameInput);
  }
}
