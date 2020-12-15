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

  this.isExistStationName = (stationName) => {
    return this.stations.includes(stationName);
  };

  this.onAddStation = (stationName) => {
    const nextStations = [...this.stations, stationName];
    this.setState({ nextStations });
  };

  this.stationNameInput = new StationNameInput({
    $target: this.$container,
    isExistStationName: this.isExistStationName,
    onAddStation: this.onAddStation,
  });
  this.stationList = new StationList({
    $target: this.$container,
    stations: this.stations,
  });

  this.setState = ({ nextIsShow, nextStations }) => {
    if (nextStations) {
      this.stations = nextStations;
      localStorageManager.setItem({
        key: STORAGE_KEY.station,
        item: nextStations,
      });

      this.stationList.setState({ nextStation: this.stations });
    }

    if (nextIsShow !== undefined) {
      this.isShow = nextIsShow;
      this.render();
    }
  };

  this.render = () => {
    this.$container.style.display = this.isShow ? "block" : "none";
  };

  this.render();
}
