import { SectionManagerHeaderButtons } from "./SectionManagerHeaderButtons.js";
import { display, displayShow, displayHide } from "../../utils/handleDom.js";
import { SectionManagerInput } from "./SectionManagerInput.js";
import { SectionManagerList } from "./SectionManagerList.js";

export class SectionManager {
  id = "section-manager-container";

  constructor(props) {
    this.getLines = props.getLines;
    this.getStations = props.getStations;
    this.setLines = props.setLines;
    this.initializeDOM(props);
  }

  initializeDOM = (props) => {
    this.manager = document.getElementById("section-manager-container");
    this.sectionManagerContaionerByLines = document.getElementById(
      "section-inputs-container-by-lines"
    );
    this.sectionManagerListContainer = document.getElementById(
      "section-manager-list-container"
    );
    this.renderHeader(props);
    this.renderInputContainer(props);
  };

  renderHeader = (props) => {
    this.sectionHeader = new SectionManagerHeaderButtons({
      ...props,
      renderSectionBodyByLine: this.renderSectionBodyByLine,
    });
  };

  renderInputContainer = (props) => {
    this.sectionManagerInput = new SectionManagerInput({
      ...props,
      addStationInLine: this.addStationInLine,
    });
    this.sectionManagerList = new SectionManagerList({
      ...props,
      deleteStationInLine: this.deleteStationInLine,
    });
  };

  render = (props) => {
    display(props.isShow, this.manager);

    if (!props.isShow) {
      displayHide(this.sectionManagerContaionerByLines);
      displayHide(this.sectionManagerListContainer);
    }

    this.sectionHeader.render(props);
    this.sectionManagerInput.renderStations();
    this.sectionManagerList.render({ lineName: this.lineName });
  };

  renderSectionBodyByLine = (lineName) => {
    this.lineName = lineName;

    displayShow(this.sectionManagerContaionerByLines);
    displayShow(this.sectionManagerListContainer);

    this.sectionManagerInput.render({ lineName: lineName });
    this.sectionManagerList.render({ lineName: lineName });
  };

  addStationInLine = (order, station, lineName) => {
    let lines = this.getLines();

    lines.forEach((line) => {
      if (line.lineName === lineName) {
        let newStations = line.stations;
        newStations.splice(order, 0, station);
        line.stations = newStations;
      }
    });

    this.setLines(lines);
  };

  deleteStationInLine = (order) => {
    let lines = this.getLines();

    lines.forEach((line) => {
      if (line.lineName === this.lineName) {
        let newStations = line.stations;
        newStations.splice(order, 1);
        line.stations = newStations;
      }
    });

    this.setLines(lines);
  };
}
