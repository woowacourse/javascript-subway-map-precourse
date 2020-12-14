import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";
import { StationManager } from "./station-manager/StationManager.js";
import { LineManager } from "./line-manager/LineManager.js";
import { MapPrint } from "./map-print-manager/MapPrint.js";
import { SectionManager } from "./section-manager/SectionManager.js";

const buttonContentMap = {
  "station-manager-button": "station-manager-container",
  "line-manager-button": "line-manager-container",
  "section-manager-button": "section-manager-container",
  "map-print-manager-button": "map-print-manager-container",
};

export class SubwayMap {
  constructor() {
    localStorage.clear(); //지우고제출
    this.props = {
      setStations: this.setStations,
      getStations: this.getStations,
      deleteStation: this.deleteStation,
      setNewLine: this.setNewLine,
      setLines: this.setLines,
      getLines: this.getLines,
      deleteLine: this.deleteLine,
    };
    this.initiateData();
    this.initiateDOM();
  }

  initiateData = () => {
    localStorage.setItem("stations", JSON.stringify([]));
    localStorage.setItem("lines", JSON.stringify([]));
  };

  initiateDOM = () => {
    this.contentContainer = new ContentContainer();
    new HeaderButtons({ clickHeaders: this.onHeaderClick });
    this.stationManager = new StationManager(this.props);
    this.lineManager = new LineManager(this.props);
    this.mapPrintManager = new MapPrint(this.props);
    this.sectionManager = new SectionManager(this.props);
  };

  onHeaderClick = (e) => {
    const { id } = e.currentTarget;
    const contentId = buttonContentMap[id];

    this.contentContainer.render({ id: contentId });
  };

  setStations = (names) => {
    localStorage.setItem("stations", JSON.stringify(names));
    this.updateStationView();
  };

  getStations = () => {
    return JSON.parse(localStorage.getItem("stations"));
  };

  deleteStation = (target) => {
    let stations = this.getStations();
    stations = stations.filter((station) => {
      return station !== target;
    });
    this.setStations(stations);
  };

  updateStationView = () => {
    this.lineManager.updateStations();
    this.sectionManager.updateStationsInInput();
  };

  setLines = (lines) => {
    localStorage.setItem("lines", JSON.stringify(lines));
    this.updateLineView();
  };

  setNewLine = (lineName, newLines) => {
    let lines = this.getLines();
    let newLine = { lineName: lineName, stations: newLines };

    lines.push(newLine);
    this.setLines(lines);
  };

  getLines = () => {
    return JSON.parse(localStorage.getItem("lines"));
  };

  deleteLine = (lineName) => {
    let lines = this.getLines();
    let newLines = lines.filter((line) => {
      return line.lineName != lineName;
    });

    this.setLines(newLines);
  };

  updateLineView = () => {
    this.sectionManager.updateHeaderButtons();
    this.sectionManager.updateSectionList();
    this.lineManager.updateLines();
    this.mapPrintManager.render();
  };
}
