import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { Element } from "./element.js";

export const LineView = {
  render() {
    this.renderLineStartEndSelector();
    this.renderLineContainerTable();
  },

  renderLineStartEndSelector() {
    let content = "";

    Station.stations.forEach((station) => {
      content += `
        <option value=${station}>${station}</option>
      `;
    });

    Element.lineStartStationSelector.innerHTML = content;
    Element.lineEndStationSelector.innerHTML = content;
  },

  renderLineContainerTable() {
    let content = "";

    Line.lines.forEach(({ name, stations }) => {
      content += `
        <tr>
          <td>${name}</td>
          <td>${stations[0]}</td>
          <td>${stations[stations.length - 1]}</td>
          <td>
            <button class="line-delete-button" data-name="${name}">삭제</button>
          </td>
        </tr>
      `;
    });

    Element.lineContainer.querySelector(Constant.TBODY).innerHTML = content;
  },
};
