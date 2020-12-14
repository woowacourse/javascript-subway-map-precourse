import StationModel from '../models/StationModel.js';
import LineModel from '../models/LineModel.js';
import StationView from '../views/StationView.js';
import Station from '../objects/Station.js';
import { DELETE_MESSAGE } from '../messages.js';

export default class StationController {
  constructor() {
    this.stationModel = new StationModel();
    this.lineModel = new LineModel();
    this.stationView = new StationView(this.stationModel.data);

    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.setElements();
    this.setEventListener();
  }

  handleSubmitStationAdd(e) {
    e.preventDefault();

    const name = this.elements.stationNameInput.value.trim();
    const station = new Station(name);

    try {
      this.stationModel.addStation(station);
      this.stationView.addListItemElement(station);
      this.elements.stationNameInput.value = '';
    } catch (err) {
      alert(err.message);
    }
  }

  handleClickStationDelete(e) {
    if (e.target.className !== 'station-delete-button') return;
    if (!window.confirm(DELETE_MESSAGE)) return;

    const { name } = e.target.dataset;

    try {
      this.stationModel.deleteStation(name, this.lineModel.data);
      this.stationView.deleteListItemElement(name);
    } catch (err) {
      alert(err.message);
    }
  }

  setElements() {
    this.elements = {
      ...this.elements,
      stationForm: document.querySelector('#station-form'),
      stationNameInput: document.querySelector('#station-name-input'),
      stationListTableBody: document.querySelector('#station-list tbody'),
    };
  }

  setEventListener() {
    this.elements.stationForm.addEventListener('submit', this.handleSubmitStationAdd.bind(this));
    this.elements.stationListTableBody.addEventListener('click', this.handleClickStationDelete.bind(this));
  }
}
