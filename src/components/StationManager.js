import StationNameInput from "./StationNameInput.js";
import StationList from "./StationList.js";

export default function StationManager({ $target, stations, isShow, onAddStation, onDeleteStation }) {
  this.$container = document.createElement("div");
  this.$container.className = "station-management";
  $target.append(this.$container);

  this.isShow = isShow;
  this.stations = stations;

  this.isExistStationName = (stationName) => {
    return this.stations.includes(stationName);
  };

  this.stationNameInput = new StationNameInput({
    $target: this.$container,
    isExistStationName: this.isExistStationName,
    onAddStation: onAddStation,
  });

  this.stationList = new StationList({
    $target: this.$container,
    stations: this.stations,
    onDeleteStation: onDeleteStation,
  });

  this.setState = ({ nextIsShow, nextStations }) => {
    if (nextStations) {
      this.stations = nextStations;
      this.stationList.setState({ nextStations: this.stations });
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
