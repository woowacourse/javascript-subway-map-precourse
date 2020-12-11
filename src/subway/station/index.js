import Subway from '../index.js';
import UserException from '../../util/userException.js';
import { ID, CLASS, NAME, ALERT } from '../../constants/index.js';
import { stationManagerTemplate } from '../../view/template.js';

export default class Station {
  userException = new UserException();

  constructor($target, $functionButtonContainer) {
    this.subways = this.loadSubways();

    this.init($target, $functionButtonContainer);
  }

  loadSubways() {
    const loadedSubways = localStorage.getItem(NAME.LOCALSTORAGE_KEY);
    let parsedSubways = [];

    if (loadedSubways !== null) {
      parsedSubways = JSON.parse(loadedSubways);
    }

    return parsedSubways;
  }

  init($target, $functionButtonContainer) {
    this.createStationManagerButton($functionButtonContainer);
    this.createStationManager($target);
    this.render();
    this.handleStationManagerButton();
    this.handleStationAddButton();
    this.handleStationDeleteButton();
  }

  createStationManagerButton($functionButtonContainer) {
    const stationManagerButton = document.createElement('button');

    stationManagerButton.id = ID.STATION_MANAGER_BUTTON;
    stationManagerButton.innerHTML = NAME.STATION_MANAGER_BUTTON_NAME;
    $functionButtonContainer.appendChild(stationManagerButton);
  }

  createStationManager($target) {
    const stationManager = document.createElement('div');

    stationManager.id = `${ID.STATION_MANAGER}`;
    stationManager.style.display = 'none';
    $target.appendChild(stationManager);
  }

  render() {
    const stationManager = document.querySelector(`#${ID.STATION_MANAGER}`);
    stationManager.innerHTML = stationManagerTemplate(this.subways);
  }

  handleStationManagerButton() {
    const stationManagerButton = document.querySelector(`#${ID.STATION_MANAGER_BUTTON}`);

    stationManagerButton.addEventListener('click', () => {
      this.showStationManager();
    });
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
    });
  }

  hasValidName(stationName) {
    if (!this.userException.isValidNameLength(stationName)) {
      alert(ALERT.VALID_STATION_NAME_LENGTH);
    } else if (this.userException.isDuplicatedName(this.subways, stationName)) {
      alert(ALERT.DUPLICATED_STATION_NAME);
    } else {
      this.saveStation(stationName);
      this.render();
      this.handleStationAddButton();
      this.handleStationDeleteButton();
    }
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

  handleStationDeleteButton() {
    const deleteStationButton = document.querySelectorAll(`.${CLASS.STATION_DELETE_BUTTON}`);
    deleteStationButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.deleteStation(event);
      });
    });
  }

  deleteStation(event) {
    this.subways.splice(event.target.parentNode.dataset.index, 1);
    this.render();
    localStorage.setItem(NAME.LOCALSTORAGE_KEY, JSON.stringify(this.subways));
  }
}

// TODO: render template 바꾸기
