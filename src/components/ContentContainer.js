import { hideOrShow } from "../utils/handleDom.js";
export class ContentContainer {
  constructor() {
    this.containers = [];
    this.initiateDOM();
    this.handleContainerList();
  }

  initiateDOM = () => {
    this.stationManagerContainer = document.getElementById(
      "station-manager-container"
    );
    this.lineManagerContainer = document.getElementById(
      "line-manager-container"
    );
    this.sectionManagerContainer = document.getElementById(
      "section-manager-container"
    );
    this.mapPrintManagerContainer = document.getElementById(
      "map-print-manager-container"
    );
  };

  handleContainerList = () => {
    this.containers.push(this.stationManagerContainer);
    this.containers.push(this.lineManagerContainer);
    this.containers.push(this.sectionManagerContainer);
    this.containers.push(this.mapPrintManagerContainer);
  };

  changeVisiblity = (number) => {
    hideOrShow(this.containers[number], this.containers);
  };
}
