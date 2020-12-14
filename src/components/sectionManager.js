import Lines from '../model/lines.js';
import Stations from '../model/stations.js';
import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { initialize } from '../util/initialize.js';
import { isDuplicatedSection } from '../util/userException.js';
import {
  sectionLineMenuTemplate,
  sectionManagerTemplate,
  sectionTableTemplate,
} from '../view/template.js';

export default class SectionManager {
  constructor($target) {
    this.stations = new Stations();
    this.stations.loadStations();

    this.lines = new Lines();
    this.lines.loadLines();

    this.sections;
    this.lineIndex;

    this.start($target);
  }

  start($target) {
    this.createSectionManager($target);
    this.handleSectionManagerButton();
  }

  createSectionManager($target) {
    const sectionManager = document.createElement('div');

    sectionManager.id = ID.SECTION_MANAGER;
    $target.appendChild(sectionManager);
  }

  handleSectionManagerButton() {
    const sectionManagerButton = document.querySelector(`#${ID.SECTION_MANAGER_BUTTON}`);

    sectionManagerButton.addEventListener('click', () => {
      initialize();
      this.updateSections();
      this.createLineMenuButton();
      this.createSectionAddContainer();
    });
  }

  updateSections() {
    this.stations.loadStations();
    this.lines.loadLines();
  }

  createLineMenuButton() {
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);
    const lineMenuContainer = document.createElement('div');

    lineMenuContainer.id = ID.SECTION_LINE_MENU_BUTTON_CONTAINER;
    sectionManager.appendChild(lineMenuContainer);
    this.renderLineMenu();
  }

  renderLineMenu() {
    const lineMenuContainer = document.querySelector(`#${ID.SECTION_LINE_MENU_BUTTON_CONTAINER}`);
    const lines = this.lines.getLines();

    lineMenuContainer.innerHTML = sectionLineMenuTemplate(lines);
  }

  createSectionAddContainer() {
    const sectionAddContainer = document.createElement('div');
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);

    sectionAddContainer.id = ID.SECTION_ADD_CONTAINER;
    sectionManager.appendChild(sectionAddContainer);

    this.createSectionTable();
    this.handleSectionLineMenuButton();
  }

  createSectionTable() {
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);
    const sectionTable = document.createElement('div');

    sectionTable.id = ID.SECTION_TABLE;
    sectionManager.appendChild(sectionTable);
  }

  handleSectionLineMenuButton() {
    const lineMenuButtons = document.querySelectorAll(`.${CLASS.SECTION_LINE_MENU_BUTTON}`);

    lineMenuButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.lineIndex = e.target.dataset.index;
        const lineName = e.target.textContent;
        const stations = this.stations.getStations();

        this.renderSectionManager(lineName, stations);
        this.sections = this.lines.getSections(this.lineIndex);
        this.handleSectionAddButton();
        this.render();
      });
    });
  }

  renderSectionManager(lineName, stations) {
    const sectionAddContainer = document.querySelector(`#${ID.SECTION_ADD_CONTAINER}`);

    sectionAddContainer.innerHTML = sectionManagerTemplate(lineName, stations);
  }

  render() {
    const sectionTable = document.querySelector(`#${ID.SECTION_TABLE}`);

    sectionTable.innerHTML = sectionTableTemplate(this.sections);
    this.handleSectionDeleteButton();
  }

  handleSectionAddButton() {
    const sectionAddButton = document.querySelector(`#${ID.SECTION_ADD_BUTTON}`);
    const sectionStaionSelector = document.querySelector(`#${ID.SECTION_STATION_SELECTOR}`);
    const sectionOrderInput = document.querySelector(`#${ID.SECTION_ORDER_INPUT}`);

    sectionAddButton.addEventListener('click', () => {
      const orderInput = sectionOrderInput.value;
      const stationSelect = sectionStaionSelector.value;

      this.hasValidInput(orderInput, stationSelect);
    });
  }

  hasValidInput(orderInput, stationSelect) {
    if (isDuplicatedSection(this.sections, stationSelect)) {
      alert(ALERT.DUPLICATED_NAME);
    } else if (orderInput < 0 || orderInput > this.sections.length || orderInput === '') {
      alert(ALERT.VALID_SECTION_NUMBER);
    } else {
      this.lines.addSection(this.lineIndex, orderInput, stationSelect);
      this.stations.addLine(stationSelect);
      this.lines.saveLines();
      this.stations.saveStations();
      this.updateSections();
      this.render();
    }
  }

  handleSectionDeleteButton() {
    const sectionDeleteButton = document.querySelectorAll(`.${CLASS.SECTION_DELETE_BUTTON}`);

    sectionDeleteButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.parentNode.dataset.index;
        const name = event.target.parentNode.dataset.name;

        this.hasValidDeleteSection(index, name);
      });
    });
  }

  hasValidDeleteSection(index, name) {
    if (this.sections.length <= 2) {
      alert(ALERT.DELETE_ERROR);
    } else {
      this.stations.deleteLine(name);
      this.stations.saveStations();
      this.lines.deleteSection(this.lineIndex, index);
      this.lines.saveLines();
      this.render();
    }
  }
}
