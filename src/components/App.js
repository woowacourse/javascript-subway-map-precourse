import Header from "./Header.js";
import Navigator from "./Navigator.js";
import StationManager from "./StationManager.js";
import localStorageManager from "../util/localStorage.js";
import { STORAGE_KEY } from "../util/constants.js";

export default function App($app) {
  this.$app = $app;
  this.header = new Header({ $target: this.$app });
  this.navigator = new Navigator({ $target: this.$app });

  this.$main = document.createElement("main");
  this.$app.append(this.$main);

  this.stations = localStorageManager.getItem({
    key: STORAGE_KEY.station,
    defaultValue: [],
  });

  this.onAddStation = (stationName) => {
    const nextStations = [...this.stations, stationName];
    this.setState({ nextStations });
  };

  this.onDeleteStation = (stationIndex) => {
    const nextStations = [...this.stations];
    nextStations.splice(stationIndex, 1);

    this.setState({ nextStations });
  };

  this.stationManager = new StationManager({
    $target: this.$main,
    stations: this.stations,
    isShow: true,
    onAddStation: this.onAddStation,
    onDeleteStation: this.onDeleteStation,
  });

  this.setState = ({ nextStations }) => {
    if (nextStations) {
      this.stations = nextStations;

      localStorageManager.setItem({
        key: STORAGE_KEY.station,
        item: nextStations,
      });

      this.stationManager.setState({ nextStations: this.stations });
    }
  };
}
