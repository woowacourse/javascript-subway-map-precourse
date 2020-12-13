import { ID, CLASS, NAME } from '../constants/index.js';
import { initialize } from '../util/initialize.js';
import { loadStorage, saveStorage } from '../util/handleStorage.js';
import {
  sectionLineMenuTemplate,
  sectionManagerTemplate,
  sectionTableTemplate,
} from '../view/template.js';

export default class SectionManager {
  constructor($target) {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);

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
      this.createLineMenuButton();
    });
  }

  createLineMenuButton() {
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);
    const lineMenuContainer = document.createElement('div');

    lineMenuContainer.id = ID.SECTION_LINE_MENU_BUTTON_CONTAINER;
    sectionManager.appendChild(lineMenuContainer);
    this.updateSections();
  }

  updateSections() {
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);

    this.renderLineMenu();
    this.createSectionAddContainer();
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
        const sections = this.getSections(lineName);

        sectionAddContainer.innerHTML = sectionManagerTemplate(lineName, this.stations);
        this.render(sections);
      });
    });
  }

  getSections(lineName) {
    let sections = [];

    this.lines.forEach((line) => {
      if (line.name === lineName) {
        sections = line.section;
      }
    });

    return sections;
  }

  render(sections) {
    const sectionTable = document.querySelector(`#${ID.SECTION_TABLE}`);

    sectionTable.innerHTML = sectionTableTemplate(sections);
  }
}
