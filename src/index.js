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
      const tableSetData = document.createElement("td");
      const stationDeleteButton = document.createElement("button");
      stationTableData.innerText = station;
      stationDeleteButton.setAttribute("class", "station-delete-button");
      stationDeleteButton.innerText = DELETE_TEXT;
      stationDeleteButton.onclick = () => {
        removeStation(station);
        this.renderStationList();
      };
      tableSetData.append(stationDeleteButton);
      tableRow.append(stationTableData, tableSetData);
      stationTableBody.append(tableRow);
    });
  }
}

new SubwayMapManager();
setStations(null);
