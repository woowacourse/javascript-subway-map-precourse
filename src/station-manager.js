import { NO_DATA_MESSAGE_ID } from "./html-constants/no-data-message.js";
import { DELETE_BUTTONS_CLASS } from "./html-constants/html-classnames.js";
import {
  getChildById,
  turnOnNoDataMessage,
  turnOffNoDataMessage,
} from "./custom-dom-handler.js";

export default class StationManager {
  constructor() {
    this.stationList = [];
    this.setStationList();
  }

  setStationList() {
    const storedStationList = localStorage.stationList;
    if (storedStationList !== undefined) {
      this.stationList = JSON.parse(storedStationList);
    }
  }

  addStation(station) {
    this.stationList.push(station);
    localStorage.stationList = JSON.stringify(this.stationList);
    this.renderStationNameTable();
  }

  removeStation(stationIndex) {
    for (let i = stationIndex + 1; i < this.stationList.length; i++) {
      this.stationList[i - 1] = this.stationList[i];
    }
    this.stationList.pop();
    localStorage.stationList = JSON.stringify(this.stationList);
    this.renderStationNameTable();
  }

  hasName(name) {
    for (let i = 0; i < this.stationList.length; i++) {
      if (this.stationList[i] === name) {
        return true;
      }
    }
    return false;
  }

  fillStationNameTable($tbody) {
    $tbody.innerHTML = "";
    this.stationList.forEach((_station, _index) => {
      $tbody.innerHTML += `
        <tr>
          <td>${_station}</td>
          <td><button 
            class=${DELETE_BUTTONS_CLASS.stationDeleteButton}
            data-station-index=${_index}>
            삭제
          </button></td>
        </tr>
      `;
    });
  }

  renderStationNameTable() {
    const $tbody = document.getElementById("station-name-tbody");
    const lenOfStationList = this.stationList.length;
    const $noStationMessage = getChildById(
      $tbody.parentElement.parentElement,
      NO_DATA_MESSAGE_ID.noStation
    );
    if (lenOfStationList === 0) {
      turnOnNoDataMessage($tbody.parentElement, $noStationMessage);
    } else {
      if (lenOfStationList === 1) {
        turnOffNoDataMessage($tbody.parentElement, $noStationMessage);
      }
      this.fillStationNameTable($tbody);
    }
  }
}
