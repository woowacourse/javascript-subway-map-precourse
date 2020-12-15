import { contentsUI } from "./contents-ui.js";

export default class MapPrintManagerUI extends contentsUI {
  constructor(contentsID, subwayINFOManager) {
    super(contentsID, subwayINFOManager);
    this.setContentsHTML("");
  }
  setContentsHTML(initialTemplate) {
    const lines = this._lineINFOManager.getAllLines();
    lines.forEach((line) => {
      initialTemplate += this._makeLineINFOHTML(line);
    });
    super.setContentsHTML(initialTemplate);
  }

  _makeLineINFOHTML(line) {
    const stationListHTML = this._makeStationListHTML(line);
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
  _makeStationListHTML(line) {
    let listHTML = "";
    line.stationsOfLine.forEach((station) => {
      listHTML += `<li>${station}</li>`;
    });
    return listHTML;
  }
}

const MAP_CLASS = "map";
