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
    isShow: false,
    onAddStation: this.onAddStation,
    onDeleteStation: this.onDeleteStation,
  });

  this.onAddLine = (line) => {
    const nextLines = [...this.lines, line];
    this.setState({ nextLines });
  };

  this.lineManager = new LineManager({
    $target: this.$main,
    isShow: true,
    stations: this.stations,
    lines: this.lines,
    onAddLine: this.onAddLine,
  });

  this.setNextStations = (nextStations) => {
    this.stations = nextStations;

    localStorageManager.setItem({
      key: STORAGE_KEY.station,
      item: nextStations,
    });
  };

  this.setNextLines = (nextLines) => {
    this.lines = nextLines;

    localStorageManager.setItem({
      key: STORAGE_KEY.line,
      item: nextLines,
    });
  };

  this.setState = ({ nextStations, nextLines }) => {
    if (nextStations) {
      this.setNextStations(nextStations);
      this.stationManager.setState({ nextStations: this.stations });
    }

    if (nextLines) {
      this.setNextLines(nextLines);
      this.lineManager.setState({ nextLines: this.lines });
    }
  };
}
