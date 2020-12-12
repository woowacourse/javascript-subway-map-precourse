import UserException from '../util/userException.js';
import { Line } from '../model/subway.js';
import { ID, NAME, ALERT } from '../constants/index.js';
import { lineManagerTemplate, lineTableTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';

export default class LineManager {
  userException = new UserException();

  constructor($target, $functionButtonContainer) {
    this.stations = this.loadStations();
    this.lines = this.loadLines();

    this.createLineManagerButton($functionButtonContainer);
    this.createLineManager($target);
    this.handleLineManagerButton();
  }

  loadStations() {
    const loadedStations = localStorage.getItem(NAME.LOCALSTORAGE_STATION_KEY);
    let parsedStations = [];

    if (loadedStations !== null) {
      parsedStations = JSON.parse(loadedStations);
    }

    return parsedStations;
  }

  loadLines() {
    const loadedLines = localStorage.getItem(NAME.LOCALSTORAGE_LINE_KEY);
    let parsedLines = [];

    if (loadedLines !== null) {
      parsedLines = JSON.parse(loadedLines);
    }

    return parsedLines;
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

  createLineTable(lineManager) {
    const lineTable = document.createElement('div');

    lineTable.id = ID.LINE_TABLE;
    lineManager.appendChild(lineTable);
    this.render();
  }

  render() {
    const lineTable = document.querySelector(`#${ID.LINE_TABLE}`);

    lineTable.innerHTML = lineTableTemplate(this.lines);
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
    this.stations = this.loadStations();
    lineManager.innerHTML = lineManagerTemplate(this.stations);
    this.createLineTable(lineManager);
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
      this.hasValidInput(
        lineNameInput.value,
        lineStartStationSelector.value,
        lineEndStationSelector.value
      );
    });
  }

  hasValidInput(lineName, lineStartStation, lineEndStation) {
    if (this.userException.isDuplicatedName(this.lines, lineName)) {
      alert(ALERT.DUPLICATED_NAME);
    } else if (lineStartStation === lineEndStation) {
      alert(ALERT.DUPLICATED_STATION);
    } else {
      this.saveLine(lineName, lineStartStation, lineEndStation);
      this.render();
      this.saveLineToStation(lineName, lineStartStation, lineEndStation);
    }
  }

  saveLine(lineName, lineStartStation, lineEndStation) {
    const line = this.addLine();

    line.name = lineName;
    line.section = [lineStartStation, lineEndStation];
    this.lines.push(line);
    localStorage.setItem(NAME.LOCALSTORAGE_LINE_KEY, JSON.stringify(this.lines));
  }

  addLine() {
    return new Line();
  }

  saveLineToStation(lineName, lineStartStation, lineEndStation) {
    this.stations.forEach((station) => {
      if (station.name === lineStartStation) {
        station.line.push(lineName);
        station.section.push(0);
      } else if (station.name === lineEndStation) {
        station.line.push(lineName);
        station.section.push(1);
      }
    });
    localStorage.setItem(NAME.LOCALSTORAGE_STATION_KEY, JSON.stringify(this.stations));
  }
}
