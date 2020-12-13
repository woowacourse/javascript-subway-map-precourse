import Typography from "../components/Typography.js";
import { MAP_DIV } from "../../common/IdAndClassNames.js";
import { lineSelector } from "../../_store/selectors.js";

export default class Map {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = MAP_DIV.substring(1);
    this.lineData = lineSelector();
  }

  _renderLineList(stations) {
    return stations.reduce((stationListTags, stationName) => {
      stationListTags += `<li>${stationName}</li>`;
      return stationListTags;
    }, "");
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
    const $emptyMessage = new Typography("현재 등록된 노선이 없습니다.", "h2");
    this.element.appendChild($emptyMessage.element);
  }

  render() {
    if (lineSelector()) this._renderTotalMap();
    else this._renderEmptyMessage();

    return this.element;
  }
}
