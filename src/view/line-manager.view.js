import station from "../service/station.service.js";
import section from "../service/section.service.js";
import LineManagerTemplate from "./template/line-manager-template.js";
export default class LineManagerView extends LineManagerTemplate {
  constructor(parentView) {
    super();
    this.parentView = parentView;

    this.station = station;
    this.section = section;
    this.FIRST_ITEM_INDEX = 0;
  }

  accessLineNameInputField() {
    return document.getElementById(this.LINE_NAME_INPUT_ID);
  }

  accessLineStartStationSelector() {
    return document.getElementById(this.LINE_START_STATION_SELECTOR_ID);
  }

  accessLineEndStationSelector() {
    return document.getElementById(this.LINE_END_STATION_SELECTOR_ID);
  }

  renderLineStationSelector() {
    const allStations = this.station.getAllStations();
    const startStationSelectBox = this.accessLineStartStationSelector();
    const endStationSelectBox = this.accessLineEndStationSelector();

    allStations.forEach((station) => {
      this.insertStationOptionHTML(startStationSelectBox, station);
      this.insertStationOptionHTML(endStationSelectBox, station);
    });
  }

  renderLineTable() {
    const allLines = this.section.getAllLines();

    const lineTableHTML = allLines.reduce((lineRowHTML, lineName) => {
      const sections = this.section.getSectionsByLineName(lineName);
      lineRowHTML += this.createLineTableRowHTML(
        lineName,
        sections[this.FIRST_ITEM_INDEX],
        sections[sections.length - 1]
      );

      return lineRowHTML;
    }, "");

    document.getElementById(this.LINE_TABLE_ID).querySelector("tbody").innerHTML = lineTableHTML;
  }

  renderLineManagerView() {
    this.parentView.innerHTML = this.createLineManagerViewHTML();
    this.renderLineStationSelector();
    this.renderLineTable();
  }

  resetLineNameInputField() {
    const lineNameInputField = this.accessLineNameInputField();
    lineNameInputField.value = "";
  }

  resetLineStationSelectorSelctor() {
    const startStationSelector = this.accessLineStartStationSelector();
    const endStationSelector = this.accessLineEndStationSelector();
    startStationSelector.selectedIndex = this.FIRST_ITEM_INDEX;
    endStationSelector.selectedIndex = this.FIRST_ITEM_INDEX;
  }

  resetLineInput() {
    this.resetLineNameInputField();
    this.resetLineStationSelectorSelctor();
  }
}
