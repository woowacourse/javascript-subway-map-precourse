import StationNameInput from "./StationNameInput.js";
import StationList from "./StationList.js";
import localStorageManager from "../util/localStorage.js";
import { STORAGE_KEY } from "../util/constants.js";

export default function StationManager({ $target, isShow }) {
  this.$container = document.createElement("div");
  this.$container.className = "station-management";
  $target.append(this.$container);

  this.isShow = isShow;
  this.stations = localStorageManager.getItem({
    key: STORAGE_KEY.station,
    defaultValue: [],
  });

  this.stationNameInput = new StationNameInput({ $target: this.$container });
  this.stationList = new StationList({
    $target: this.$container,
    stations: this.stations,
  });

  this.render = () => {
    this.$container.style.display = this.isShow ? "block" : "none";
  };

  this.render();
}
