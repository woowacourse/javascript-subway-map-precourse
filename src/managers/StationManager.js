import {
  rendStationMangeDom,
  clearMangeContainer,
  addStation,
} from "../views/domController.js";
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
      addLocalStorageByKey("stations", new Station(stationNameElem.value));
      rendStationMangeDom();
    } else {
      alert(STATION.INPUT_ERROR_MESSAGE);
    }
    stationNameElem.value = "";
  };

  confirmStationDelete(targetElem) {
    try {
      if (deleteStationValidate(targetElem.dataset.index)) {
        deleteDataByName("stations", targetElem.dataset.index, "name");
        const removeElem = targetElem.parentNode.parentNode;
        removeElem.parentNode.removeChild(removeElem);
      } else {
        alert(STATION.DELETE_ERROR_MESSAGE);
      }
    } catch (e) {}
  }

  setStationDeleteEvent() {
    document.querySelectorAll(".station-delete-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        if (confirm(DELETE_CONFIRM_MESSAGE)) confirmStationDelete(event.target);
      });
    });
  }

  rendStationMangeDom() {
    clearMangeContainer();
    const container = document.getElementById("subway-manager-container");
    const div = document.createElement("div");
    div.innerHTML = stationMangeContainer();
    container.appendChild(div);
    setStationDeleteEvent();
  }

  initEvent() {
    document
      .getElementById("station-add-button")
      .addEventListener("click", () => {
        addStation();
      });
  }

  render() {
    rendStationMangeDom();
    this.initEvent();
  }
}
