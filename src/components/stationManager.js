import UserException from '../util/userException.js';
import { Station } from '../model/subway.js';
import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { stationManagerTemplate, stationTableTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';

export default class StationManager {
  userException = new UserException();

  constructor($target, $functionButtonContainer) {
    this.stations = this.loadStations();

    this.start($target, $functionButtonContainer);
  }

  loadStations() {
    const loadedStations = localStorage.getItem(NAME.LOCALSTORAGE_STATION_KEY);
    let parsedStations = [];

    if (loadedStations !== null) {
      parsedStations = JSON.parse(loadedStations);
    }

    return parsedStations;
  }

  start($target, $functionButtonContainer) {
    this.createStationManagerButton($functionButtonContainer);
    this.createStationManager($target);
    this.handleStationManagerButton();
  }

  createStationManagerButton($functionButtonContainer) {
    const stationManagerButton = document.createElement('button');

    stationManagerButton.id = ID.STATION_MANAGER_BUTTON;
    stationManagerButton.innerHTML = NAME.STATION_MANAGER_BUTTON_NAME;
    $functionButtonContainer.appendChild(stationManagerButton);
  }

  createStationManager($target) {
    const stationManager = document.createElement('div');

    stationManager.id = ID.STATION_MANAGER;
    stationManager.style.display = 'none';
    $target.appendChild(stationManager);
  }

  handleStationManagerButton() {
    const stationManagerButton = document.querySelector(`#${ID.STATION_MANAGER_BUTTON}`);

    stationManagerButton.addEventListener('click', () => {
      initialize();
      this.updateStations();
      this.showStationManager();
      this.handleStationAddButton();
    });
  }

  updateStations() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
    this.stations = this.loadStations();
    stationManager.innerHTML = stationManagerTemplate();
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

  showStationManager() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
    stationManager.style.display = 'block';
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
    localStorage.setItem(NAME.LOCALSTORAGE_STATION_KEY, JSON.stringify(this.stations));
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

    if (this.stations[index].line.length > 0) {
      alert(ALERT.DELETE_ERROR);
    } else {
      this.stations.splice(index, 1);
      localStorage.setItem(NAME.LOCALSTORAGE_STATION_KEY, JSON.stringify(this.stations));
      this.render();
    }
  }
}
