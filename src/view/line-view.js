import { Station } from "../model/station.js";
import { Element } from "./element.js";

export const LineView = {
  render() {
    this.renderSelector();
    this.renderTable();
  },

  renderSelector() {
    let content = "";

    Station.stations.forEach((station) => {
      content += `
        <option value=${station}>${station}</option>
      `;
    });

    Element.lineStartStationSelector.innerHTML = content;
    Element.lineEndStationSelector.innerHTML = content;
  },

  renderTable() {

  }
}