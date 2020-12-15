import { Line } from "../model/line.js"
import { Element } from "./element.js";

export const MapView = {
  render() {
    let content = '<div class="map">';

    Line.lines.forEach(({ name, stations }) => {
      content += `<h3>${name}</h3><ul>`;

      stations.forEach((station) => {
        content += `<li>${station}</li>`;
      })
      content += '</ul>';
    })
    content += '</div>';

    Element.mapPrintContainer.innerHTML = content;
  }
}