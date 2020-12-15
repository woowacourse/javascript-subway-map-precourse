import Lines from '../model/lines.js';
import Stations from '../model/stations.js';
import { ID, CLASS } from '../constants/index.js';
import { initialize } from '../util/initialize.js';
import { mapPrintTemplate } from '../view/template.js';

export default class MapPrintManager {
  constructor($target) {
    this.stations = new Stations();
    this.stations.loadStations();

    this.lines = new Lines();
    this.lines.loadLines();

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
    this.stations.loadStations();
    this.lines.loadLines();
  }

  createMapTemplate() {
    const mapPrintManager = document.querySelector(`#${ID.MAP_PRINT_MANAGER}`);
    const mapPrint = document.createElement('div');

    mapPrint.className = CLASS.MAP;
    mapPrintManager.appendChild(mapPrint);
    this.render();
  }

  render() {
    const mapPrint = document.querySelector(`.${CLASS.MAP}`);
    const lines = this.lines.getLines();

    mapPrint.innerHTML = mapPrintTemplate(lines);
  }
}
