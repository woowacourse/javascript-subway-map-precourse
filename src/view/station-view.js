import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { Element } from "./element.js";

export const StationView = {
  render() {
    let content = "";

    Station.stations.forEach((station) => {
      content += `
        <tr>
          <td>${station}</td>
          <td>
            <button class="station-delete-button" data-name="${station}">삭제</button>
          </td>
        </tr>
      `;
    });

    Element.stationContainer.querySelector(Constant.TBODY).innerHTML = content;
  },
};
