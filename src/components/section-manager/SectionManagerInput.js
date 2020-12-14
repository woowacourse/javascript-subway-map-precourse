import {
  addOptionTag,
  initSelector,
  addLineNameHeader,
} from "../../utils/handleDom.js";
import {} from "../../utils/templates.js";
export class SectionManagerInput {
  constructor({ getStations, lineName }) {
    this.getStations = getStations;
    this.initializeDOM(lineName);
    this.sectionManagerInput.prepend(this.headerHTML);
    this.render();
  }

  initializeDOM = (lineName) => {
    this.sectionManagerInput = document.getElementById(
      "section-inputs-container-by-lines"
    );
    this.headerHTML = addLineNameHeader(lineName);
    this.sectionStationSelector = document.getElementById(
      "section-station-selector"
    );
    this.sectionAddButton = document.getElementById("section-add-button");
    this.sectionInput = document.getElementById("section-order-input");
  };

  render = () => {
    console.log("렌더몇번되는뎅");
    const stations = this.getStations();
    initSelector(this.sectionStationSelector);

    stations.forEach((station) => {
      addOptionTag(this.sectionStationSelector, station);
    });
  };
}
