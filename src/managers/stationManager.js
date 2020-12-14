import { DOMs, DOMCtrl, DOMStrings, strings } from '../doms.js';
import { dataStrings, saveData } from '../index.js';
import { isValidStationName, isValidStationDeletion } from '../valid.js';

export default class StationManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;

    this.setStationEventListeners();
  }

  setStationEventListeners() {
    DOMs.STATION_MANAGER_BUTTON.addEventListener('click', this.openStationManager.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addStationByClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('keydown', this.addStationByEnterKey.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteStationButtonClick.bind(this));
  }

  addStationByClick(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.STATION_ADD_BUTTON) {
      this.addStation();
    }
  }

  addStationByEnterKey(event) {
    const {
      key,
      target: { id },
    } = event;
    if (key === 'Enter') {
      if (id === DOMStrings.STATION_NAME_INPUT) {
        this.addStation();
      }
    }
  }

  addStation() {
    const station = document.getElementById(DOMStrings.STATION_NAME_INPUT).value.trim();
    if (isValidStationName(this.stations, station)) {
      this.stations.push(station);
      saveData(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
      this.openStationManager.bind(this)();
    }
  }

  deleteStationButtonClick(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.STATION_DELETE_BUTTON) {
      if (confirm(strings.CONFIRM_DELETION)) {
        const targetStationName = event.target.dataset[dataStrings.DATA_STATION];
        this.deleteStation(targetStationName);
      }
    }
  }

  deleteStation(targetStationName) {
    if (isValidStationDeletion(this.lines, targetStationName)) {
      const index = this.stations.indexOf(targetStationName);
      this.stations.splice(index, 1);
      saveData(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
      this.openStationManager.bind(this)();
    }
  }

  openStationManager() {
    const stationManager = `
      <div id="${DOMStrings.STATION_MANAGER}"><br>
        <span>${strings.STATION_NAME}</span><br>
        <input type="text" id="${DOMStrings.STATION_NAME_INPUT}" placeholder="${strings.STATION_PLACEHOLDER}"/>
        <button id="${DOMStrings.STATION_ADD_BUTTON}"> ${strings.STATION_ADD}</button>
        <h1>${strings.STATION_LIST_TITLE}</h1>
        ${this.getStationList(this.stations)}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = stationManager;
  }

  getStationList(stations) {
    return `
      <table id="${DOMStrings.STATION_LIST_TABLE}">
        <tr>
          <th><b>${strings.STATION_NAME}</b></th>
          <th><b>${strings.SETTING}</b></th>
        </tr>
        ${stations
          .map(
            station => `<tr><td>${station}</td><td><button class="${DOMStrings.STATION_DELETE_BUTTON}" 
              data-${dataStrings.DATA_STATION}="${station}">${strings.DELETE}</button></td></tr>`
          )
          .join('')}
      </table>
    `;
  }
}
