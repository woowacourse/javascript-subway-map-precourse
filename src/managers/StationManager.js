import {
  rendStationMangeDom,
  clearMangeContainer,
  addStation,
} from "../views/domController.js";

export default class StationManager {
  constructor() {
    this.stations = localStorage.getItem("stations") || [];
  }

  render() {
    clearMangeContainer();
    rendStationMangeDom();
    this.initEvent();
  }

  initEvent() {
    document
      .getElementById("station-add-button")
      .addEventListener("click", () => {
        addStation();
      });
  }
}
