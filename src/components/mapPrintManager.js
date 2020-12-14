import { ID, CLASS, NAME, ALERT } from '../constants/index.js';
import { initialize } from '../util/initialize.js';
import { loadStorage, saveStorage } from '../util/handleStorage.js';
import { mapPrintTemplate } from '../view/template.js';

export default class MapPrintManager {
  constructor($target) {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);

    this.start($target);
  }

  start($target) {
    this.createMapPrintManager($target);
    this.handleMapPrintManagerButton();
  }

  createMapPrintManager($target) {
    const mapPrintManager = document.createElement('div');

    mapPrintManager.id = ID.MAP_PRINT_MANAGER;
    $target.appendChild(mapPrintManager);
  }

  handleMapPrintManagerButton() {
    const mapPrintManagerButton = document.querySelector(`#${ID.MAP_PRINT_MANAGER_BUTTON}`);

    mapPrintManagerButton.addEventListener('click', () => {
      initialize();
      this.updateMaps();
      this.createMapTemplate();
    });
  }

  updateMaps() {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
    this.lines = loadStorage(NAME.LOCALSTORAGE_LINE_KEY);
  }

  createMapTemplate() {
    const mapPrintManager = document.querySelector(`#${ID.MAP_PRINT_MANAGER}`);
    const mapPrint = document.createElement('div');

    mapPrint.className = CLASS.MAP;
    mapPrint.innerHTML = mapPrintTemplate(this.lines);
    mapPrintManager.appendChild(mapPrint);
  }
}
