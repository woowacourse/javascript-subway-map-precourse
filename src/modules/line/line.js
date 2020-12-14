import { loadStationData, setLine } from './lineDataHandler.js';
import { clearInput } from '../inputHandler.js';
import { addEventToCreateLineBtn, addEventToDeleteBtn } from '../event.js';
import { printLines } from '../print.js';

export default class Line {
  constructor() {
    printLines();
    loadStationData();
    addEventToCreateLineBtn();
    addEventToDeleteBtn('#line-list');
  }

  static createLine() {
    const lineNameInput = document.querySelector('#line-name-input');
    const startStation = document.querySelector('#line-start-station-selector')
      .value;
    const endStation = document.querySelector('#line-end-station-selector')
      .value;
    setLine(lineNameInput, startStation, endStation);
    clearInput(lineNameInput);
  }
}
