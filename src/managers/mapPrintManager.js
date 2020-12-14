import { DOMs, DOMCtrl, DOMStrings } from '../doms.js';

export default class MapPrintManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;

    this.setMapPrintEventListeners();
  }

  setMapPrintEventListeners() {
    DOMs.MAP_PRINT_MANAGER_BUTTON.addEventListener('click', this.openMapPrintManager.bind(this));
  }

  openMapPrintManager() {
    const mapManager = `
      <div class="${DOMStrings.MAP_PRINT_MANAGER}">
        ${this.lines
          .map(
            line => `
              <h3>${line.lineName}</h3>
              <ul>${line.stations.map(station => `<li>${station}</li>`).join('')}</ul>`
          )
          .join('')}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = mapManager;
  }
}
