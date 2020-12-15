import Typography from "../components/Typography.js";
import { MAP_DIV } from "../../common/IdAndClassNames.js";
import { lineSelector } from "../../store/selectors.js";
import NotExistErrorMessage from "../common/NotExistErrorMessage.js";

export default class Map {
  constructor() {
    this.tabIndex = 3;
    this.element = document.createElement("div");
    this.element.id = MAP_DIV.substring(1);
  }

  _renderLineList(stations) {
    return stations.reduce(
      (stationListTags, stationName) =>
        stationListTags + `<li>${stationName}</li>`,
      "",
    );
  }

  _renderStationMap({ lineName, stations }) {
    const $lineMap = document.createElement("div");
    const $lineName = new Typography(lineName, "h3");
    $lineMap.innerHTML =
      $lineName.element.outerHTML +
      `<ul>${this._renderLineList(stations)}</ul>`;
    return $lineMap;
  }

  _renderTotalMap() {
    lineSelector().forEach((lineData) =>
      this.element.appendChild(this._renderStationMap(lineData)),
    );
  }

  _renderEmptyMessage() {
    this.element.appendChild(NotExistErrorMessage());
  }

  render() {
    if (lineSelector().length > 0) this._renderTotalMap();
    else this._renderEmptyMessage();

    return this.element;
  }
}
