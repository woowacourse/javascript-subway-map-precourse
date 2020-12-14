import Stations from '../model/stations.js';
import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { stationManagerTemplate, stationTableTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';
import { isValidNameLength, isDuplicatedName } from '../util/userException.js';

export default class StationManager {
  constructor($target) {
    this.stations = new Stations();
    this.stations.loadStations();

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
      this.renderStationsManager();
      this.handleStationAddButton();
    });
  }

  updateStations() {
    this.stations.loadStations();
  }

  renderStationsManager() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);

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
    const stations = this.stations.getStations();

    stationTable.innerHTML = stationTableTemplate(stations);
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
    const stations = this.stations.getStations();

    if (!isValidNameLength(stationName)) {
      alert(ALERT.VALID_STATION_NAME_LENGTH);
    } else if (isDuplicatedName(stations, stationName)) {
      alert(ALERT.DUPLICATED_STATION);
    } else {
      this.stations.addStation(stationName);
      this.stations.saveStations();
      this.render();
    }
  }

  handleStationDeleteButton() {
    const deleteStationButton = document.querySelectorAll(`.${CLASS.STATION_DELETE_BUTTON}`);

    deleteStationButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.parentNode.dataset.index;

        this.stations.deleteStation(index);
        this.stations.saveStations();
        this.render();
      });
    });
  }
}
