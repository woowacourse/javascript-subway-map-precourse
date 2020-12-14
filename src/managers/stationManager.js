import { DOMs, DOMStrings, dataStrings, strings } from '../doms.js';
import { saveData } from '../index.js';
import { isValidStationName, isValidStationDeletion } from '../valid.js';
import StationManagerUI from '../views/stationManagerUI.js';

export default class StationManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;
    this.UIController = new StationManagerUI();

    this.setStationEventListeners();
  }

  setStationEventListeners() {
    DOMs.STATION_MANAGER_BUTTON.addEventListener('click', () => {
      this.UIController.openStationManager(this.stations);
    });
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
      saveData(dataStrings.DATA_STATIONS, this.stations);
      this.refreshStationManager();
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
      saveData(dataStrings.DATA_STATIONS, this.stations);
      this.refreshStationManager();
    }
  }

  refreshStationManager() {
    this.UIController.openStationManager(this.stations);
  }
}
