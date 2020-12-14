import Station from "./Station.js";
import Line from "./Line.js";

export default class SectionManager {
  constructor() {
    this._lineMenuList = document.querySelector("#line-menu-button-group");
    this._stationSelector = document.querySelector("#section-station-selector");
    this._addSectionContainer = document.querySelector(
      "#add-section-container"
    );
    this._station = new Station();
    this._line = new Line();

    this._render();
  }

  _createLineMenu = name => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = name;
    button.classList.add("section-line-menu-button");

    li.appendChild(button);
    this._lineMenuList.appendChild(li);
  };

  _printLineMenuList = () => {
    const lineList = this._line.getLineList();
    this._lineMenuList.innerHTML = "";

    lineList.forEach(line => {
      this._createLineMenu(line.name);
    });
  };

  _render = () => {
    this._printLineMenuList();
    this._station.setStationOptions(this._stationSelector);
  };
}
