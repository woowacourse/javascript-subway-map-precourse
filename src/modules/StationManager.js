import Station from "./Station.js";

export default class StationManager {
  constructor() {
    this._nameInput = document.querySelector("#station-name-input");
    this._addButton = document.querySelector("#station-add-button");
    this.tableBody = document.querySelector("#station-name-list tbody");
    this.station = new Station();
  }
}
