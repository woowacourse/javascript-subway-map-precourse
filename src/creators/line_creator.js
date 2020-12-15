import { getFormattedStations } from "../common/function.js";
import {
  getAdvancedEle,
  createStationOptions,
  appendChildren,
} from "../common/visualization.js";

const LineCreator = function () {
  this.createTitleOfSelect = (startOrEnd) =>
    getAdvancedEle(
      "span",
      { for: `line-${startOrEnd}-station-selector` },
      `${startOrEnd === "start" ? "상행" : "하행"} 종점`
    );

  this.createStationSelector = (startOrEnd) =>
    getAdvancedEle("select", {
      id: `line-${startOrEnd}-station-selector`,
    });

  this.createStartOrEndStationDiv = (startOrEnd) => {
    const startOrEndStationDiv = document.createElement("div");
    const titleSpanOfSelector = this.createTitleOfSelect(startOrEnd);
    const stationSelector = this.createStationSelector(startOrEnd);
    const stationOptions = createStationOptions(getFormattedStations());
    appendChildren(stationSelector, ...stationOptions);
    appendChildren(startOrEndStationDiv, titleSpanOfSelector, stationSelector);
    return startOrEndStationDiv;
  };
};
