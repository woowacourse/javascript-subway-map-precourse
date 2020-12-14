import StationController from './StationController.js';
import LineController from './LineController.js';
import SectionController from './SectionController.js';
import MapPrintController from './MapPrintController.js';

export default class MenuController {
  constructor() {
    this.elements = {
      stationManagerButton: document.querySelector('#station-manager-button'),
      lineManagerButton: document.querySelector('#line-manager-button'),
      sectionManagerButton: document.querySelector('#section-manager-button'),
      mapPrintManagerButton: document.querySelector('#map-print-manager-button'),
    };

    this.setEventListener();
  }

  setEventListener() {
    this.elements.stationManagerButton.addEventListener('click', () => new StationController());
    this.elements.lineManagerButton.addEventListener('click', () => new LineController());
    this.elements.sectionManagerButton.addEventListener('click', () => new SectionController());
    this.elements.mapPrintManagerButton.addEventListener('click', () => new MapPrintController());
  }
}
