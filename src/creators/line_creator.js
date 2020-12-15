import { getAdvancedEle } from "../common/visualization.js";

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
};
