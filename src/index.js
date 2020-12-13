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

const menuIds = [
  "station-manager-button",
  "line-manager-button",
  "section-manager-button",
  "map-print-manager-button",
];

export default class SubwayMapManager {
  constructor() {
    this.clickMenuEventListener();
    this.clickAddStationEventListener();
  }

  clickMenuEventListener() {
    menuIds.forEach((id) => {
      addClickEventFromId(id, () => {
        this.hideContentChildren();
        this.renderContent(id);
      });
    });
  }

  renderContent(id) {
    const isMap = Boolean(id.match("map"));
    if (isMap) {
      this.renderMapContent();
      return;
    }
    const content = document.getElementById(id.replace("button", "content"));
    content.style.display = "block";
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

  hideContentChildren() {
    const contentChildren = Array.from(
      document.getElementById("content").children
    );
    contentChildren.forEach((el) => (el.style.display = "none"));
    const mapContent = document.getElementsByClassName("map")[0];
    if (mapContent !== undefined) {
      mapContent.remove();
    }
  }

  renderMapContent() {
    const newEl = document.createElement("div");
    newEl.setAttribute("class", "map");
    newEl.innerHTML = "노선 출력 내용";
    const contentEl = document.getElementById("content");
    contentEl.appendChild(newEl);
  }
}

new SubwayMapManager();
setStations(null);
