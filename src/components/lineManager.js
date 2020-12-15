import Lines from '../model/lines.js';
import Stations from '../model/stations.js';
import { ID, CLASS, ALERT } from '../constants/index.js';
import { lineManagerTemplate, lineTableTemplate } from '../view/template.js';
import { initialize } from '../util/initialize.js';
import {
  isDuplicatedName,
  isValidLineNameLength,
  isDuplicatedStation,
  isValidStation,
} from '../util/userException.js';

export default class LineManager {
  constructor($target) {
    this.stations = new Stations();
    this.stations.loadStations();

    this.lines = new Lines();
    this.lines.loadLines();

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
      this.renderLineManager();
      this.handleLineAddButton();
    });
  }

  updateLines() {
    this.stations.loadStations();
    this.lines.loadLines();
  }

  renderLineManager() {
    const lineManager = document.querySelector(`#${ID.LINE_MANAGER}`);
    const stations = this.stations.getStations();

    lineManager.innerHTML = lineManagerTemplate(stations);
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
    const lines = this.lines.getLines();

    lineTable.innerHTML = lineTableTemplate(lines);
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
    const lines = this.lines.getLines();

    if (isDuplicatedName(lines, lineName)) {
      alert(ALERT.DUPLICATED_NAME);
    } else if (isValidStation(lineStartStation, lineEndStation)) {
      alert(ALERT.VALID_STATION);
    } else if (isDuplicatedStation(lineStartStation, lineEndStation)) {
      alert(ALERT.DUPLICATED_STATION);
    } else if (isValidLineNameLength(lineName)) {
      alert(ALERT.VALID_LINE_NAME_LENGTH);
    } else {
      this.addLines(lineName, lineStartStation, lineEndStation);
      this.render();
    }
  }

  addLines(lineName, lineStartStation, lineEndStation) {
    this.lines.addLine(lineName, [lineStartStation, lineEndStation]);
    this.lines.saveLines();
    this.stations.addLine(lineStartStation);
    this.stations.addLine(lineEndStation);
    this.stations.saveStations();
  }

  handleLineDeleteButton() {
    const deleteLineButton = document.querySelectorAll(`.${CLASS.LINE_DELETE_BUTTON}`);

    deleteLineButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.parentNode.dataset.index;
        const lines = this.lines.getLines();
        const lineSection = lines[index].section;

        this.deleteLines(lineSection, index);
        this.render();
      });
    });
  }

  deleteLines(lineSection, index) {
    this.stations.deleteLine(lineSection);
    this.stations.saveStations();
    this.lines.deleteLine(index);
    this.lines.saveLines();
  }
}
