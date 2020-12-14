import { existStationName, pushNewStation } from "./utils/station.js";
import {
  addClickEventFromId,
  resetLineTable,
  renderStationTable,
  renderLineTable,
} from "./utils/dom.js";
import { setStateToStorage } from "./utils/storage.js";
import {
  INPUT_ALREADY_EXIST_NAME_MESSAGE,
  INPUT_LESS_THAN_2_MESSAGE,
  INPUT_ALREADY_EXIST_LINE_NAME_MESSAGE,
  CANT_SAME_START_AND_END_MESSAGE,
  ALREAY_EXIST_SAME_END_POINTS,
  LOCAL_STORAGE_LINES_KEY,
} from "./constants/index.js";
import { existLineName, existLineSameEndPoints } from "./utils/line.js";
import Header from "./Header.js";
import Line from "./Line.js";

export default class SubwayMapManager {
  constructor() {
    new Header();
    this.clickAddStationEventListener();
    this.lineAddClickEventListener();
  }

  clickAddStationEventListener() {
    addClickEventFromId("station-add-button", () => {
      const stationInputValue = document.getElementById("station-name-input")
        .value;
      if (stationInputValue.length < 2) {
        alert(INPUT_LESS_THAN_2_MESSAGE);
        return;
      }
      const isExistStationName = existStationName(stationInputValue);
      if (isExistStationName) {
        alert(INPUT_ALREADY_EXIST_NAME_MESSAGE);
        return;
      }
      pushNewStation(stationInputValue);
      renderStationTable();
    });
  }

  lineAddClickEventListener() {
    addClickEventFromId("line-add-button", () => {
      const lineNameValue = document.getElementById("line-name-input").value;
      const startValue = document.getElementById("line-start-station-selector")
        .value;
      const endValue = document.getElementById("line-end-station-selector")
        .value;
      if (existLineName(lineNameValue)) {
        alert(INPUT_ALREADY_EXIST_LINE_NAME_MESSAGE);
        return;
      }
      if (startValue === endValue) {
        alert(CANT_SAME_START_AND_END_MESSAGE);
        return;
      }
      if (existLineSameEndPoints([startValue, endValue])) {
        alert(ALREAY_EXIST_SAME_END_POINTS);
        return;
      }
      new Line(lineNameValue, [startValue, endValue]).add();
      resetLineTable();
      renderLineTable();
    });
  }
}

new SubwayMapManager();
