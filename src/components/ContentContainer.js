import { StationManager } from "./station-manager/StationManager.js";
import { LineManager } from "./line-manager/LineManager.js";
import { MapPrint } from "./map-print-manager/MapPrint.js";
import { SectionManager } from "./section-manager/SectionManager.js";

export class ContentContainer {
  constructor(props) {
    this.props = {
      ...props,
      getStations: this.getStations,
      setLines: this.setLines,
      getLines: this.getLines,
    };
    this.initiateData();
    this.initiateDOM();
  }

  initiateDOM = () => {
    this.contents = [
      new StationManager(this.props),
      new LineManager(this.props),
      new MapPrint(this.props),
      new SectionManager(this.props),
    ];
  };

  initiateData = () => {
    localStorage.setItem("stations", JSON.stringify([]) || []);
    localStorage.setItem("lines", JSON.stringify([]) || []);
  };

  onUpdate = () => {
    this.render(this.props);
  };

  render = (props) => {
    this.props = props;
    this.id = props.id;

    this.contents.forEach((content) => {
      content.render({
        ...props,
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
    this.onUpdate();
  };

  getLines = () => {
    return JSON.parse(localStorage.getItem("lines"));
  };
}
