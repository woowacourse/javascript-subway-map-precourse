import Station from "./Station.js";
import Line from "./Line.js";

export default class LineManager {
  constructor() {
    this._nameInput = document.querySelector("#line-name-input");
    this._addButton = document.querySelector("#line-add-button");
    this._startStationSelector = document.querySelector(
      "#line-start-station-selector"
    );
    this._endStationSelector = document.querySelector(
      "#line-end-station-selector"
    );
    this._tableBody = document.querySelector("#station-line-list tbody");
    this._station = new Station();
    this._line = new Line();

    this._render();
  }

  _render = () => {
    this._station.setStationOptions(this._startStationSelector);
    this._station.setStationOptions(this._endStationSelector);
  };
}
