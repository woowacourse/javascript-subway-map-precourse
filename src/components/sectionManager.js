import { ID, CLASS, NAME } from '../constants/index.js';
import { initialize } from '../util/initialize.js';
import { loadStorage, saveStorage } from '../util/handleStorage.js';
import { sectionLineMenuTemplate } from '../view/template.js';

export default class SectionManager {
  constructor($target, $functionButtonContainer) {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);

    this.createSectionManagerButton($functionButtonContainer);
    this.createSectionManager($target);
    this.handleSectionManagerButton();
    this.createLineMenuButton();
  }

  createSectionManagerButton($functionButtonContainer) {
    const sectionManagerButton = document.createElement('button');

    sectionManagerButton.id = ID.SECTION_MANAGER_BUTTON;
    sectionManagerButton.innerHTML = NAME.SECTION_MANAGER_BUTTON_NAME;
    $functionButtonContainer.appendChild(sectionManagerButton);
  }

  createSectionManager($target) {
    const sectionManager = document.createElement('div');

    sectionManager.id = ID.SECTION_MANAGER;
    sectionManager.style.display = 'none';
    $target.appendChild(sectionManager);
  }

  handleSectionManagerButton() {
    const sectionManagerButton = document.querySelector(`#${ID.SECTION_MANAGER_BUTTON}`);

    sectionManagerButton.addEventListener('click', () => {
      initialize();
      this.updateOption();
      this.showSectionManager();
    });
  }

  updateOption() {
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.renderLineMenu();
  }

  renderLineMenu() {
    const lineMenuContainer = document.querySelector(`#${ID.SECTION_LINE_MENU_BUTTON_CONTAINER}`);
    lineMenuContainer.innerHTML = sectionLineMenuTemplate(this.lines);
  }

  showSectionManager() {
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);

    sectionManager.style.display = 'block';
  }

  createLineMenuButton() {
    const sectionManager = document.querySelector(`#${ID.SECTION_MANAGER}`);
    const lineMenuContainer = document.createElement('div');

    lineMenuContainer.id = ID.SECTION_LINE_MENU_BUTTON_CONTAINER;
    sectionManager.appendChild(lineMenuContainer);
    this.renderLineMenu();
  }
}
