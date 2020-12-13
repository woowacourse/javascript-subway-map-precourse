import UserException from '../util/userException.js';
import { Station } from '../model/subway.js';
import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { stationManagerTemplate, stationTableTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';
import { loadStorage, saveStorage } from '../util/handleStorage.js';

export default class StationManager {
  userException = new UserException();

  constructor($target) {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);

    this.start($target);
  }

  start($target) {
    this.createStationManager($target);
    this.handleStationManagerButton();
  }

  createStationManager($target) {
    const stationManager = document.createElement('div');

    stationManager.id = ID.STATION_MANAGER;
    $target.appendChild(stationManager);
  }

  handleStationManagerButton() {
    const stationManagerButton = document.querySelector(`#${ID.STATION_MANAGER_BUTTON}`);

    stationManagerButton.addEventListener('click', () => {
      initialize();
      this.updateStations();
      this.handleStationAddButton();
    });
  }

  updateStations() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);

    stationManager.innerHTML = stationManagerTemplate();
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.createStationTable(stationManager);
  }

  createStationTable(stationManager) {
    const stationTable = document.createElement('div');

    stationTable.id = ID.STATION_TABLE;
    stationManager.appendChild(stationTable);
    this.render();
  }

  render() {
    const stationTable = document.querySelector(`#${ID.STATION_TABLE}`);

    stationTable.innerHTML = stationTableTemplate(this.stations);
    this.handleStationDeleteButton();
  }

  handleStationAddButton() {
    const stationAddButton = document.querySelector(`#${ID.STATION_ADD_BUTTON}`);
    const stationNameInput = document.querySelector(`#${ID.STATION_NAME_INPUT}`);

    stationAddButton.addEventListener('click', () => {
      this.hasValidName(stationNameInput.value);
      stationNameInput.value = '';
    });
  }

  hasValidName(stationName) {
    if (!this.userException.isValidNameLength(stationName)) {
      alert(ALERT.VALID_STATION_NAME_LENGTH);
    } else if (this.userException.isDuplicatedName(this.stations, stationName)) {
      alert(ALERT.DUPLICATED_STATION);
    } else {
      this.saveStation(stationName);
      this.render();
    }
  }

  saveStation(stationName) {
    const station = this.addStation();

    station.name = stationName;
    this.stations.push(station);
    saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
  }

  addStation() {
    return new Station();
  }

  handleStationDeleteButton() {
    const deleteStationButton = document.querySelectorAll(`.${CLASS.STATION_DELETE_BUTTON}`);

    deleteStationButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.deleteStation(event);
      });
    });
  }

  deleteStation(event) {
    const index = event.target.parentNode.dataset.index;

    if (this.stations[index].line > 0) {
      alert(ALERT.DELETE_ERROR);
    } else {
      this.stations.splice(index, 1);
      saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
      this.render();
    }
  }
}
