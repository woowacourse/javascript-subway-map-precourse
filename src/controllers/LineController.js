import StationModel from '../models/StationModel.js';
import LineModel from '../models/LineModel.js';
import LineView from '../views/LineView.js';
import Line from '../objects/Line.js';
import { DELETE_MESSAGE } from '../messages.js';

export default class LineController {
  constructor() {
    this.stationModel = new StationModel();
    this.lineModel = new LineModel();
    this.lineView = new LineView(this.stationModel.data, this.lineModel.data);

    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.setElements();
    this.setEventListener();
  }

  handleSubmitLineAdd(e) {
    e.preventDefault();

    try {
      const name = this.elements.lineNameInput.value.trim();
      const startStation = this.stationModel.getStation(this.elements.lineStartStationSelector.value);
      const endStation = this.stationModel.getStation(this.elements.lineEndStationSelector.value);
      const line = new Line(name, startStation, endStation);

      this.lineModel.addLine(line);
      this.lineView.addListItemElement(line);
      this.elements.lineNameInput.value = '';
    } catch (err) {
      alert(err.message);
    }
  }

  handleClickLineDelete(e) {
    if (e.target.className !== 'line-delete-button') return;
    if (!window.confirm(DELETE_MESSAGE)) return;

    const { name } = e.target.dataset;

    try {
      this.lineModel.deleteLine(name);
      this.lineView.deleteListItemElement(name);
    } catch (err) {
      alert(err.message);
    }
  }

  setElements() {
    this.elements = {
      ...this.elements,
      lineForm: document.querySelector('#line-form'),
      lineNameInput: document.querySelector('#line-name-input'),
      lineStartStationSelector: document.querySelector('#line-start-station-selector'),
      lineEndStationSelector: document.querySelector('#line-end-station-selector'),
      lineListTableBody: document.querySelector('#line-list tbody'),
    };
  }

  setEventListener() {
    this.elements.lineForm.addEventListener('submit', this.handleSubmitLineAdd.bind(this));
    this.elements.lineListTableBody.addEventListener('click', this.handleClickLineDelete.bind(this));
  }
}
