import { StationManager } from "./station-manager/StationManager.js";
import { LineManager } from "./line-manager/LineManager.js";
import { MapPrint } from "./map-print-manager/MapPrint.js";
import { SectionManager } from "./section-manager/SectionManager.js";

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
    this.contents = [
      this.stationManager,
      this.lineManager,
      this.sectionManager,
      this.mapPrintManager,
    ];
  };

  initiateData = () => {
    localStorage.setItem("stations", JSON.stringify([]) || []);
    localStorage.setItem("lines", JSON.stringify([]) || []);
  };

  render = (props) => {
    this.props = props;
    this.id = props.id;

    this.contents.forEach((content) => {
      content.render({
        ...props,
        ...this.state,
        onUpdate: this.onUpdate,
        isShow: content.id === this.id,
      });
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
    this.mapPrintManager.render(this.props);
  };
}
