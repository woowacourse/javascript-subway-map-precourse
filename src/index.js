import { existStationName, pushNewStation } from "./utils/station.js";
import {
  addClickEventFromId,
  resetLineTable,
  renderStationTable,
  renderLineTable,
} from "./utils/dom.js";
import * as message from "./constants/message.js";
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
        alert(message.MORE_THAN_2_STATION_NAME);
        return;
      }
      const isExistStationName = existStationName(stationInputValue);
      if (isExistStationName) {
        alert(message.ALREADY_EXIST_STATION_NAME);
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
        alert(message.ALREADY_EXIST_LINE_NAME);
        return;
      }
      if (startValue === endValue) {
        alert(message.CANT_SAME_START_AND_END);
        return;
      }
      if (existLineSameEndPoints([startValue, endValue])) {
        alert(message.ALREAY_EXIST_SAME_END_POINTS);
        return;
      }
      new Line(lineNameValue, [startValue, endValue]).add();
      resetLineTable();
      renderLineTable();
    });
  }
}

new SubwayMapManager();
