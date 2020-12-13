import { Line } from '../model/subway.js';
import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { lineManagerTemplate, lineTableTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';
import { loadStorage, saveStorage } from '../util/handleStorage.js';
import { isDuplicatedName } from '../util/userException.js';

export default class LineManager {
  constructor($target) {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);

    this.start($target);
  }

  start($target) {
    this.createLineManager($target);
    this.handleLineManagerButton();
  }

  createLineManager($target) {
    const lineManager = document.createElement('div');

    lineManager.id = ID.LINE_MANAGER;
    $target.appendChild(lineManager);
  }

  handleLineManagerButton() {
    const lineManagerButton = document.querySelector(`#${ID.LINE_MANAGER_BUTTON}`);

    lineManagerButton.addEventListener('click', () => {
      initialize();
      this.updateLines();
      this.handleLineAddButton();
    });
  }

  updateLines() {
    const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);

    lineManager.innerHTML = lineManagerTemplate(this.stations);
    this.createLineTable(lineManager);
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
    this.handleLineDeleteButton();
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
      lineNameInput.value = '';
    });
  }

  hasValidInput(lineName, lineStartStation, lineEndStation) {
    if (isDuplicatedName(this.lines, lineName)) {
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
    saveStorage(NAME.LOCALSTORAGE_LINE_KEY, this.lines);
  }

  addLine() {
    return new Line();
  }

  saveLineToStation(lineName, lineStartStation, lineEndStation) {
    this.stations.forEach((station) => {
      if (station.name === lineStartStation) {
        station.line += 1;
      } else if (station.name === lineEndStation) {
        station.line += 1;
      }
    });
    saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
  }

  handleLineDeleteButton() {
    const deleteLineButton = document.querySelectorAll(`.${CLASS.LINE_DELETE_BUTTON}`);

    deleteLineButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.deleteLineToStation(event);
        this.deleteLine(event);
      });
    });
  }

  deleteLineToStation(event) {
    const index = event.target.parentNode.dataset.index;
    const lineSection = this.lines[index].section;

    this.stations.forEach((station) => {
      if (lineSection.indexOf(station.name) > -1) {
        station.line -= 1;
      }
    });
    saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
  }

  deleteLine(event) {
    const index = event.target.parentNode.dataset.index;

    this.lines.splice(index, 1);
    saveStorage(NAME.LOCALSTORAGE_LINE_KEY, this.lines);
    this.render();
  }
}
