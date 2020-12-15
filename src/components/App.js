import Header from "./Header.js";
import Navigator from "./Navigator.js";
import StationManager from "./StationManager.js";
import LineManager from "./LineManager.js";
import SectionManager from "./SectionManager.js";
import localStorageManager from "../util/localStorage.js";
import { ELEMENT_INFO, STORAGE_KEY } from "../util/constants.js";

export default function App($app) {
  this.$app = $app;
  this.header = new Header({ $target: this.$app });

  this.positionId = "";

  this.onTogglePosition = (nextPositionId) => {
    this.stationManager.setState({ nextIsShow: nextPositionId === this.stationManager.id });
    this.lineManager.setState({ nextIsShow: nextPositionId === this.lineManager.id, nextStations: this.stations });
    this.sectionManager.setState({
      nextIsShow: nextPositionId === this.sectionManager.id,
      nextStations: this.stations,
    });
  };

  this.navigator = new Navigator({
    $target: this.$app,
    onTogglePosition: this.onTogglePosition,
  });

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
    id: ELEMENT_INFO.navigator[0].id,
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

  this.onDeleteLine = (lineIndex) => {
    const nextLines = [...this.lines];
    nextLines.splice(lineIndex, 1);

    this.setState({ nextLines });
  };

  this.lineManager = new LineManager({
    id: ELEMENT_INFO.navigator[1].id,
    $target: this.$main,
    isShow: false,
    stations: this.stations,
    lines: this.lines,
    onAddLine: this.onAddLine,
    onDeleteLine: this.onDeleteLine,
  });

  this.updateSection = (lineIndex, nextStations) => {
    const nextLines = [...this.lines];
    nextLines.splice(lineIndex, 1, { ...nextLines[lineIndex], stations: nextStations });

    this.setState({ nextLines });
  };

  this.sectionManager = new SectionManager({
    id: ELEMENT_INFO.navigator[2].id,
    $target: this.$main,
    isShow: false,
    stations: this.stations,
    lines: this.lines,
    updateSection: this.updateSection,
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
      this.sectionManager.setState({ nextLines: this.lines });
    }
  };
}
