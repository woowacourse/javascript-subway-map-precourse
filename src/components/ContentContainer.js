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
      setLines: this.setLines,
      getLines: this.getLines,
    };
    this.initiateData();
    this.initiateDOM();
  }

  initiateDOM = () => {
    this.stationManager = new StationManager(this.props);
    this.lineManager = new LineManager(this.props);
    this.mapPrintManager = new MapPrint(this.props);
    this.sectionManager = new SectionManager(this.props);
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

  getStations = () => {
    return JSON.parse(localStorage.getItem("stations"));
  };

  setLines = (lines) => {
    localStorage.setItem("lines", JSON.stringify(lines));
    this.updateLineView();
  };

  getLines = () => {
    return JSON.parse(localStorage.getItem("lines"));
  };

  updateStationView = () => {
    this.lineManager.updateStations();
    this.sectionManager.updateStationsInInput();
  };

  updateLineView = () => {
    this.sectionManager.updateHeaderButtons();
    this.sectionManager.updateSectionList();
    this.lineManager.updateLines();
    this.mapPrintManager.render();
  };
}
