import { DOMs, DOMCtrl, DOMStrings, strings } from '../doms.js';
import { dataStrings, saveData } from '../index.js';
import { isValidLineName, isStartDiffersWithEnd } from '../valid.js';

export default class LineManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;

    this.setLineEventListeners();
  }

  setLineEventListeners() {
    DOMs.LINE_MANAGER_BUTTON.addEventListener('click', this.openLineManager.bind(this));
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
        saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
        this.openLineManager.bind(this)();
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
    saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
    this.openLineManager.bind(this)();
  }

  openLineManager() {
    const lineManager = `
      <div id="${DOMStrings.LINE_MANAGER}"><br>
        <span>${strings.LINE_NAME}</span><br>
        <input type="text" id="${DOMStrings.LINE_NAME_INPUT}" 
          placeholder="${strings.LINE_PLACEHOLDER}" /><br><br>
        ${this.getLineSelectors(this.stations)}
        <button id="${DOMStrings.LINE_ADD_BUTTON}">${strings.LINE_ADD}</button>
        <h1>${strings.LINE_LIST_TITLE}</h1>
        ${this.getLineList(this.lines)}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = lineManager;
  }

  getLineSelectors(stations) {
    return `
      <span>${strings.LINE_START} 
        <select id="${DOMStrings.LINE_START_STATION_SELECTOR}">
          ${stations.map(station => `<option>${station}</option>`).join('')}
        </select>
      </span><br>
      <span>${strings.LINE_END} 
        <select id="${DOMStrings.LINE_END_STATION_SELECTOR}">
          ${stations.map(station => `<option>${station}</option>`).join('')}
        </select>
      </span><br><br>
    `;
  }

  getLineList(lines) {
    return `
      <table id="${DOMStrings.LINE_LIST_TABLE}">
        ${this.getLineListHeader()}
        ${lines.map(line => this.getLineListContent(line)).join('')}
      </table>
    `;
  }

  getLineListHeader() {
    return `
      <tr>
        <th><b>${strings.LINE_NAME}</b></th>
        <th><b>${strings.LINE_START_STATION}</b></th>
        <th><b>${strings.LINE_END_STATION}</b></th>
        <th><b>${strings.SETTING}</b></th>
      </tr>
    `;
  }

  getLineListContent(line) {
    return `
      <tr>
        <td>${line.lineName}</td>
        <td>${line.start}</td>
        <td>${line.end}</td>
        <td><button class="${DOMStrings.LINE_DELETE_BUTTON}" 
          data-${dataStrings.DATA_LINE}="${line.lineName}">${strings.DELETE}</button></td>
      </tr>
    `;
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
