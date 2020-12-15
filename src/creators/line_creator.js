import { getFormattedStations } from "../common/function.js";
import {
  getAdvancedEle,
  createStationOptions,
  appendChildren,
} from "../common/visualization.js";

const LineCreator = function () {
  this.createLineNameTitle = () => getAdvancedEle("div", null, "노선 이름");

  this.createLineNameInput = () =>
    getAdvancedEle("input", {
      id: "line-name-input",
      placeholder: "노선 이름을 입력해주세요",
    });

  this.createLineAddButton = () =>
    getAdvancedEle("button", { id: "line-add-button" }, "노선 추가");

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

  this.createLineAddDIV = () => {
    const addDiv = document.createElement("div");
    const lineNameTitle = this.createLineNameTitle();
    const lineNameInput = this.createLineNameInput();
    const startStationDIV = this.createStartOrEndStationDiv("start");
    const endStationDIV = this.createStartOrEndStationDiv("end");
    const lineAddButton = this.createLineAddButton();
    appendChildren(addDiv, lineNameTitle, lineNameInput);
    appendChildren(addDiv, startStationDIV, endStationDIV, lineAddButton);
    return addDiv;
  };
};
