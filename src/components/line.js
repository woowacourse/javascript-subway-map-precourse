import { ID, NAME } from '../constants/index.js';
import { lineManagerTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';

export default class Line {
  constructor($target, $functionButtonContainer) {
    this.subways = this.loadSubways();

    this.createLineManagerButton($functionButtonContainer);
    this.createLineManager($target);
    this.handleLineManagerButton();
  }

  loadSubways() {
    const loadedSubways = localStorage.getItem(NAME.LOCALSTORAGE_KEY);
    let parsedSubways = [];

    if (loadedSubways !== null) {
      parsedSubways = JSON.parse(loadedSubways);
    }

    return parsedSubways;
  }

  createLineManagerButton($functionButtonContainer) {
    const lineManagerButton = document.createElement('button');

    lineManagerButton.id = ID.LINE_MANAGER_BUTTON;
    lineManagerButton.innerHTML = NAME.LINE_MANAGER_BUTTON_NAME;
    $functionButtonContainer.appendChild(lineManagerButton);
  }

  createLineManager($target) {
    const lineManager = document.createElement('div');

    lineManager.id = ID.LINE_MANAGER;
    lineManager.style.display = 'none';
    $target.appendChild(lineManager);
  }

  handleLineManagerButton() {
    const lineManagerButton = document.querySelector(`#${ID.LINE_MANAGER_BUTTON}`);

    lineManagerButton.addEventListener('click', () => {
      initialize();
      this.updateOption();
      this.showLineManager();
      this.handleLineAddButton();
    });
  }

  updateOption() {
    const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);

    this.subways = this.loadSubways();
    lineManager.innerHTML = lineManagerTemplate(this.subways);
  }

  showLineManager() {
    const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);
    lineManager.style.display = 'block';
  }

  handleLineAddButton() {
    const lineAddButton = document.querySelector(`#${ID.LINE_ADD_BUTTON}`);
    const lineNameInput = document.querySelector(`#${ID.LINE_NAME_INPUT}`);
    const lineStartStationSelector = document.querySelector(`#${ID.LINE_START_STATION_SELECTOR}`);
    const lineEndStationSelector = document.querySelector(`#${ID.LINE_END_STATION_SELECTOR}`);

    lineAddButton.addEventListener('click', () => {
      console.log(lineNameInput.value);
      console.log(lineStartStationSelector.value);
    });
  }
}
