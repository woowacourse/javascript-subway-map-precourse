import { DOMs, DOMStrings, dataStrings, strings } from '../doms.js';
import { saveData } from '../index.js';
import { isValidLineName, isStartDiffersWithEnd } from '../valid.js';
import LineManagerUI from '../views/lineManagerUI.js';

export default class LineManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;
    this.UIController = new LineManagerUI();

    this.setLineEventListeners();
  }

  setLineEventListeners() {
    DOMs.LINE_MANAGER_BUTTON.addEventListener('click', () => {
      this.UIController.openLineManager(this.stations, this.lines);
    });
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addLineByClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('keydown', this.addLineByEnterKey.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteLineButtonClick.bind(this));
  }

  addLineByClick(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.LINE_ADD_BUTTON) {
      this.addLine();
    }
  }

  addLineByEnterKey(event) {
    const {
      key,
      target: { id },
    } = event;
    if (key === 'Enter') {
      if (id === DOMStrings.LINE_NAME_INPUT) {
        this.addLine();
      }
    }
  }

  addLine() {
    const lineName = document.getElementById(DOMStrings.LINE_NAME_INPUT).value.trim();
    if (isValidLineName(this.lines, lineName)) {
      const startStation = document.getElementById(DOMStrings.LINE_START_STATION_SELECTOR).value;
      const endStation = document.getElementById(DOMStrings.LINE_END_STATION_SELECTOR).value;
      if (isStartDiffersWithEnd(startStation, endStation)) {
        this.lines.push(new SubwayLine(lineName, startStation, endStation));
        saveData(dataStrings.DATA_LINES, this.lines);
        this.refreshLineManager();
      }
    }
  }

  deleteLineButtonClick(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.LINE_DELETE_BUTTON) {
      if (confirm(strings.CONFIRM_DELETION)) {
        const targetLine = event.target.dataset[dataStrings.DATA_LINE];
        this.deleteLine(targetLine);
      }
    }
  }

  deleteLine(targetLine) {
    const index = this.lines.findIndex(line => line.lineName === targetLine);
    this.lines.splice(index, 1);
    saveData(dataStrings.DATA_LINES, this.lines);
    this.refreshLineManager();
  }

  refreshLineManager() {
    this.UIController.openLineManager(this.stations, this.lines);
  }
}

class SubwayLine {
  constructor(lineName, start, end) {
    this.lineName = lineName;
    this.start = start;
    this.end = end;
    this.stations = [start, end];
  }
}
