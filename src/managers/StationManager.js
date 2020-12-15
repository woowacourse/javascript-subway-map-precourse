import { clearMangeContainer } from "../views/domController.js";
import { stationMangeContainer } from "../views/dom.js";
import Station from "../components/Station.js";
import { addLocalStorageByKey, deleteDataByName } from "../utils/util.js";
import {
  addStationValidate,
  deleteStationValidate,
} from "../utils/validator.js";
import { STATION, DELETE_CONFIRM_MESSAGE } from "../constants.js";

export default class StationManager {
  constructor() {
    this.stations = localStorage.getItem("stations") || [];
  }

  addStation = () => {
    const stationNameElem = document.getElementById("station-name-input");
    if (addStationValidate(stationNameElem.value)) {
      console.log("success");
      addLocalStorageByKey("stations", new Station(stationNameElem.value));
      this.rendStationMangeDom();
    } else {
      alert(STATION.INPUT_ERROR_MESSAGE);
    }
    stationNameElem.value = "";
  };

  confirmStationDelete(targetElem) {
    try {
      if (deleteStationValidate(targetElem.dataset.index)) {
        deleteDataByName("stations", targetElem.dataset.index, "name");
        this.rendStationMangeDom();
      } else {
        alert(STATION.DELETE_ERROR_MESSAGE);
      }
    } catch (e) {}
  }

  setStationDeleteEvent() {
    document.querySelectorAll(".station-delete-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        if (confirm(DELETE_CONFIRM_MESSAGE))
          this.confirmStationDelete(event.target);
      });
    });
  }

  initEvent() {
    document
      .getElementById("station-add-button")
      .addEventListener("click", () => {
        this.addStation();
      });
  }

  rendStationMangeDom() {
    clearMangeContainer();
    const container = document.getElementById("subway-manager-container");
    const div = document.createElement("div");
    div.innerHTML = stationMangeContainer();
    container.appendChild(div);
    this.setStationDeleteEvent();
    this.initEvent();
  }

  render() {
    this.rendStationMangeDom();
  }
}
