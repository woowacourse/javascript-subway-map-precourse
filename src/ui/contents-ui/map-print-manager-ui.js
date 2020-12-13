import { contentsUI } from "./contents-ui.js";

export default class MapPrintManager extends contentsUI {
  constructor(contentsID, stationINFOManager) {
    super(contentsID, stationINFOManager);
    this.setContentsHTML("");
  }

  setContentsHTML(initialTemplate) {
    const lines = this.stationINFOManager_.getLineINFOs();
    lines.forEach((line) => {
      initialTemplate += this.makeLineINFOHTML_(line);
    });
    super.setContentsHTML(initialTemplate);
  }

  makeLineINFOHTML_(line) {
    const stationListHTML = this.makeStationListHTML_(line);
    const infoHTML = `
    <div class="${MAP_CLASS}">
      <h2>${line.name}</h2>
      <ul>
        ${stationListHTML}
      </ul>
    </div>
    `;
    return infoHTML;
  }
  makeStationListHTML_(line) {
    let listHTML = "";
    line.stationsOfLine.forEach((station) => {
      listHTML += `<li>${station.name}</li>`;
    });
    return listHTML;
  }
}

const MAP_CLASS = "map";
