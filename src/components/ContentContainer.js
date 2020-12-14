import { StationManager } from "./station-manager/StationManager.js";
import { LineManager } from "./line-manager/LineManager.js";
import { MapPrint } from "./map-print-manager/MapPrint.js";
import { SectionManager } from "./section-manager/SectionManager.js";
import { displayShow, displayhide } from "../utils/handleDom.js";

const contentIds = [
  "station-manager-container",
  "line-manager-container",
  "section-manager-container",
  "map-print-manager-container",
];
export class ContentContainer {
  constructor(props) {
    this.props = {
      ...props,
      updateStationView: this.updateStationView,
      getStations: this.getStations,
      setNewLine: this.setNewLine,
      setLines: this.setLines,
      getLines: this.getLines,
      deleteLine: this.deleteLine,
    };
    this.state = {
      stations: [],
      lines: [],
    };
    this.initiateData();
    this.initiateDOM();
  }

  initiateDOM = () => {
    this.stationManager = new StationManager(this.props);
    this.lineManager = new LineManager(this.props);
    this.mapPrintManager = new MapPrint(this.props);
    this.sectionManager = new SectionManager(this.props);
    this.contents = [
      this.stationManager,
      this.lineManager,
      this.mapPrintManager,
      this.sectionManager,
    ];
  };

  onUpdate = (newState) => {
    this.state = newState;
    this.render(this.props);
  };

  initiateData = () => {
    localStorage.setItem("stations", JSON.stringify([]) || []);
    localStorage.setItem("lines", JSON.stringify([]) || []);
  };
  render = (props) => {
    this.props = props;
    this.id = props.id;

    // this.contents.forEach((content) => {
    //   content.render({
    //     ...props,
    //     ...this.state,
    //     onUpdate: this.onUpdate,
    //     // isShow: content.id === contentId,
    //   });
    // });
    contentIds.forEach((contentId) => {
      const content = document.getElementById(contentId);
      if (contentId === this.id) {
        displayShow(content);
      } else {
        displayhide(content);
      }
    });
  };

  // setStations = (names) => {
  //   localStorage.setItem("stations", JSON.stringify(names));
  //   this.updateStationView();
  // };

  getStations = () => {
    return JSON.parse(localStorage.getItem("stations"));
  };

  // deleteStation = (target) => {
  //   let stations = this.getStations();
  //   stations = stations.filter((station) => {
  //     return station !== target;
  //   });
  //   this.setStations(stations);
  // };

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
