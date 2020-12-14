import {
  rendStationMangeDom,
  clearMangeContainer,
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
        //add Station
      });
  }
}
