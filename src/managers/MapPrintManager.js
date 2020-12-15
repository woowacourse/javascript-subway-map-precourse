import { clearMangeContainer, mapContainer } from "../views/dom.js";

export default class MapPrintManager {
  rendStationMap() {
    const container = document.getElementById("subway-manager-container");
    const div = document.createElement("div");
    div.setAttribute("class", "map");
    div.innerHTML = mapContainer();
    container.appendChild(div);
  }

  render() {
    clearMangeContainer();
    this.rendStationMap();
  }
}
