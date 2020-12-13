import { HeaderButtons } from "./HeaderButtons.js";
import { ContentContainer } from "./ContentContainer.js";
import { StationManager } from "./station-manager/StationManager.js";
import { LineManager } from "./line-manager/LineManager.js";

const buttonContentMap = {
  "station-manager-button": "station-manager-container",
  "line-manager-button": "line-manager-container",
  "section-manager-button": "section-manager-container",
  "map-print-manager-button": "map-print-manager-container",
};

export class SubwayMap {
  constructor() {
    this.props = {
      setStations: this.setStations,
      getStations: this.getStations,
      deleteStation: this.deleteStation,
      setLines: this.setLines,
      getLines: this.getLines,
    };

    this.initiateDOM();
    this.initiateData();
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
  };

  onHeaderClick = (e) => {
    const { id } = e.currentTarget;
    const contentId = buttonContentMap[id];
    this.contentContainer.render({ id: contentId });
  };

  setStations = (names) => {
    localStorage.setItem("stations", JSON.stringify(names));
    this.updateView();
  };

  getStations = () => {
    return JSON.parse(localStorage.getItem("stations"));
  };

  deleteStation = (target) => {
    let stations = this.getStations();
    stations = stations.filter((station) => {
      // TODOS: 노선에 등록되어있는지 확인.
      return station !== target;
    });
    this.setStations(stations);
  };

  updateView = () => {
    // this.stationManager.render({
    //   setStations: this.setStations,
    //   getStations: this.getStations,
    //   deleteStation: this.deleteStation,
    // });
    this.lineManager.update();
  };

  setLines = (lineName, newLines) => {
    let lines = this.getLines();
    let newLine = { [lineName]: newLines };
    console.log(lines);

    lines.push(newLine);
    localStorage.setItem("lines", JSON.stringify(lines));
  };

  getLines = () => {
    return JSON.parse(localStorage.getItem("lines"));
  };
}
