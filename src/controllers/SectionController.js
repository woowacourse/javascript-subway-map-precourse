import StationModel from '../models/StationModel.js';
import LineModel from '../models/LineModel.js';
import SectionView from '../views/SectionView.js';
import { DELETE_MESSAGE } from '../messages.js';

export default class SectionController {
  constructor() {
    this.stationModel = new StationModel();
    this.lineModel = new LineModel();
    this.sectionView = new SectionView(this.stationModel.data, this.lineModel.data);

    this.selectedLine = null;

    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.setElementsLineMenu();
    this.setEventListenerLineMenu();
  }

  handleSubmitSectionAdd(e) {
    e.preventDefault();

    try {
      const selectedStationName = this.elements.sectionStationSelector.value;
      const selectedStation = this.stationModel.getStation(selectedStationName);
      const order = parseInt(this.elements.sectionOrderInput.value.trim(), 10);

      this.lineModel.addSection(selectedStation, this.selectedLine, order);
      this.sectionView.updateSectionListElement(this.selectedLine);
    } catch (err) {
      alert(err.message);
    }
  }

  handleClickSectionDelete(e) {
    if (e.target.className !== 'section-delete-button') return;
    if (!window.confirm(DELETE_MESSAGE)) return;

    try {
      const { name } = e.target.dataset;
      this.lineModel.deleteSection(name, this.selectedLine);
      this.sectionView.updateSectionListElement(this.selectedLine);
    } catch (err) {
      alert(err.message);
    }
  }

  setElementsForm() {
    this.elements = {
      ...this.elements,
      sectionForm: document.querySelector('#section-form'),
      sectionStationSelector: document.querySelector('#section-station-selector'),
      sectionOrderInput: document.querySelector('#section-order-input'),
      sectionAddButton: document.querySelector('#section-add-button'),
      sectionListTableBody: document.querySelector('#section-list tbody'),
    };
  }

  setEventListenerForm() {
    this.elements.sectionForm.addEventListener('submit', this.handleSubmitSectionAdd.bind(this));
    this.elements.sectionListTableBody.addEventListener('click', this.handleClickSectionDelete.bind(this));
  }

  handleClickLineMenu(e) {
    if (e.target.className !== 'section-line-menu-button') return;

    const { lineName } = e.target.dataset;
    const selectedLine = this.lineModel.getLine(lineName);

    if (selectedLine) {
      this.selectedLine = selectedLine;
      this.sectionView.renderForm(selectedLine);
      this.setElementsForm();
      this.setEventListenerForm();
    }
  }

  setElementsLineMenu() {
    this.elements = {
      ...this.elements,
      sectionLineMenuButtonContainer: document.querySelector('#section-line-menu-button-container'),
      sectionLineMenuContainer: document.querySelector('#section-line-menu-container'),
    };
  }

  setEventListenerLineMenu() {
    this.elements.sectionLineMenuButtonContainer.addEventListener('click', this.handleClickLineMenu.bind(this));
  }
}
