import {
  getStations,
  setStations,
  existStationName,
  pushNewStation,
  removeStation,
} from "./utils/station.js";
import { addClickEventFromId, resetStationTable } from "./utils/dom.js";
import {
  INPUT_ALREADY_EXIST_NAME_MESSAGE,
  INPUT_LESS_THAN_2_MESSAGE,
  DELETE_TEXT,
} from "./constant.js";
import Header from "./Header.js";

export default class SubwayMapManager {
  constructor() {
    new Header();
    this.clickAddStationEventListener();
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
      this.renderStationList();
    });
  }

  renderStationList() {
    const stations = getStations();
    if (!stations) {
      return;
    }
    resetStationTable();
    const stationTableBody = document.getElementById("station-table-body");
    stations.forEach((station) => {
      const tableRow = document.createElement("tr");
      const stationTableData = document.createElement("td");
      stationTableData.innerText = station;
      const tableSetData = document.createElement("td");
      const stationSetButton = document.createElement("button");
      stationSetButton.innerText = DELETE_TEXT;
      stationSetButton.onclick = () => {
        removeStation(station);
        this.renderStationList();
      };
      tableSetData.appendChild(stationSetButton);
      tableRow.append(stationTableData, tableSetData);
      stationTableBody.appendChild(tableRow);
    });
  }
}

new SubwayMapManager();
setStations(null);
