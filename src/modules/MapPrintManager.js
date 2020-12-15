import { UNDEFINED_LINE_ALERT } from "../constant/message.js";

export default class MapPrintManager {
  constructor(line) {
    this._mapPrintContainer = document.querySelector("#map-print-container");
    this._line = line;

    this._render();
  }

  _createLineLi = stationName => {
    const li = document.createElement("li");
    li.textContent = stationName;

    return li;
  };

  _createLineListElements = line => {
    const lineContainer = document.createElement("div");
    const lineName = document.createElement("h2");
    const ul = document.createElement("ul");

    lineContainer.classList.add("map");
    lineName.textContent = line.name;

    line.list.forEach(stationName => {
      ul.appendChild(this._createLineLi(stationName));
    });

    lineContainer.appendChild(lineName);
    lineContainer.appendChild(ul);
    this._mapPrintContainer.appendChild(lineContainer);
  };

  _printNoLineMessage = () => {
    const p = document.createElement("p");
    p.textContent = UNDEFINED_LINE_ALERT;
    this._mapPrintContainer.appendChild(p);
  };

  _printLineList = () => {
    this._mapPrintContainer.innerHTML = "";
    const lineList = this._line.getLineList();

    if (lineList.length === 0) {
      this._printNoLineMessage();

      return;
    }

    lineList.forEach(line => {
      this._createLineListElements(line);
    });
  };

  _render = () => {
    this._printLineList();
  };

  updateView = () => {
    this._printLineList();
  };
}
