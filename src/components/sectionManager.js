import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { initialize } from '../util/initialize.js';
import { loadStorage, saveStorage } from '../util/handleStorage.js';
import { isDuplicatedSection } from '../util/userException.js';
import {
  sectionLineMenuTemplate,
  sectionManagerTemplate,
  sectionTableTemplate,
} from '../view/template.js';

export default class SectionManager {
  constructor($target) {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);
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

  createLineMenuButton() {
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);
    const lineMenuContainer = document.createElement('div');

    lineMenuContainer.id = ID.SECTION_LINE_MENU_BUTTON_CONTAINER;
    sectionManager.appendChild(lineMenuContainer);
    this.renderLineMenu();
  }

  updateSections() {
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
  }

  renderLineMenu() {
    const lineMenuContainer = document.querySelector(`#${ID.SECTION_LINE_MENU_BUTTON_CONTAINER}`);

    lineMenuContainer.innerHTML = sectionLineMenuTemplate(this.lines);
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
    const sectionAddContainer = document.querySelector(`#${ID.SECTION_ADD_CONTAINER}`);

    lineMenuButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const lineName = e.target.textContent;
        this.getSections(lineName);

        sectionAddContainer.innerHTML = sectionManagerTemplate(lineName, this.stations);
        this.handleSectionAddButton();
        this.render();
      });
    });
  }

  getSections(lineName) {
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].name === lineName) {
        this.sections = this.lines[i].section;
        this.lineIndex = i;
      }
    }
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
      this.addSectionsToLine(orderInput, stationSelect);
      this.addLineToStations(stationSelect);
      this.updateSections();
      this.render();
    }
  }

  addSectionsToLine(orderInput, stationSelect) {
    this.sections.splice(orderInput, 0, stationSelect);
    this.lines[this.lineIndex].section = this.sections;
    saveStorage(NAME.LOCALSTORAGE_LINE_KEY, this.lines);
  }

  addLineToStations(stationSelect) {
    this.stations.forEach((station) => {
      if (station.name === stationSelect) {
        station.line += 1;
      }
    });
    saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
  }

  handleSectionDeleteButton() {
    const sectionDeleteButton = document.querySelectorAll(`.${CLASS.SECTION_DELETE_BUTTON}`);

    sectionDeleteButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.parentNode.dataset.index;
        this.hasValidDeleteSection(index);
      });
    });
  }

  hasValidDeleteSection(index) {
    if (this.sections.length <= 2) {
      alert(ALERT.DELETE_ERROR);
    } else {
      this.deleteLineToStation(index);
      this.deleteSection(index);
    }
  }

  deleteLineToStation(index) {
    const deleteStation = this.sections[index];

    this.stations.forEach((station) => {
      if (station.name === deleteStation) {
        station.line -= 1;
      }
    });
    saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
  }

  deleteSection(index) {
    this.sections.splice(index, 1);
    this.lines[this.lineIndex].section = this.sections;
    saveStorage(NAME.LOCALSTORAGE_LINE_KEY, this.lines);
    this.render();
  }
}
