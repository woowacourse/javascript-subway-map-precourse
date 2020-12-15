import Header from "./Header.js";
import Navigator from "./Navigator.js";
import StationManager from "./StationManager.js";
import localStorageManager from "../util/localStorage.js";
import { STORAGE_KEY } from "../util/constants.js";
import LineManager from "./LineManager.js";

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
  this.lines = localStorageManager.getItem({
    key: STORAGE_KEY.line,
    defaultValue: [
      { name: "8호선", stations: ["몽촌토성", "잠실"] },
      { name: "9호선", stations: ["종합운동장", "봉은사"] },
    ],
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
    isShow: false,
    onAddStation: this.onAddStation,
    onDeleteStation: this.onDeleteStation,
  });

  this.lineManager = new LineManager({
    $target: this.$main,
    isShow: true,
    stations: this.stations,
    lines: this.lines,
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
