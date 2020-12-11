import Subway from '../index.js';
import { ID, NAME } from '../../constants/index.js';
import { stationManagerTemplate } from '../../view/template.js';

export default class Station {
  constructor($target, $functionButtonContainer) {
    this.createStationManagerButton($functionButtonContainer);
    this.createStationManager($target);
    this.handleStationManagerButton();

    this.subways = this.loadSubways();
  }

  createStationManagerButton($functionButtonContainer) {
    const stationManagerButton = document.createElement('button');
    stationManagerButton.id = ID.STATION_MANAGER_BUTTON;
    stationManagerButton.innerHTML = NAME.STATION_MANAGER_BUTTON_NAME;
    $functionButtonContainer.appendChild(stationManagerButton);
  }

  createStationManager($target) {
    const $stationManager = document.createElement('div');
    $stationManager.id = `${ID.STATION_MANAGER}`;
    $target.appendChild($stationManager);
  }

  handleStationManagerButton() {
    const stationManagerButton = document.querySelector(
      `#${ID.STATION_MANAGER_BUTTON}`
    );

    stationManagerButton.addEventListener('click', () => {
      this.render();
    });
  }

  render() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
    stationManager.innerHTML = stationManagerTemplate(this.subways);

    this.handleStationAddButton();
  }

  loadSubways() {
    const loadedSubways = localStorage.getItem(NAME.LOCALSTORAGE_KEY);
    let parsedSubways = [];

    if (loadedSubways !== null) {
      parsedSubways = JSON.parse(loadedSubways);
    }

    return parsedSubways;
  }

  handleStationAddButton() {
    const stationAddButton = document.querySelector(
      `#${ID.STATION_ADD_BUTTON}`
    );
    const stationNameInput = document.querySelector(
      `#${ID.STATION_NAME_INPUT}`
    );
    stationAddButton.addEventListener('click', () => {
      this.saveStation(stationNameInput.value);
      this.render();
    });
  }

  saveStation(station) {
    const subway = this.addSubway();
    subway.station = station;
    this.subways.push(subway);
    localStorage.setItem(NAME.LOCALSTORAGE_KEY, JSON.stringify(this.subways));
  }

  addSubway() {
    return new Subway();
  }
}
