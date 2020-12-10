import StationLine from "./station-line.js";
import { NO_DATA_MESSAGE_ID } from "./html-constants/no-data-message.js";
import { DELETE_BUTTONS_CLASS } from "./html-constants/html-classnames.js";
import {
  getChildById,
  turnOnNoDataMessage,
  turnOffNoDataMessage,
} from "./handlers/custom-dom-handler.js";

export default class LineManager {
  constructor() {
    this.lineList = [];
    this.setLineList();
  }

  setLineList() {
    const storedLineList = localStorage.lineList;
    if (storedLineList !== undefined) {
      const storedLineListObj = JSON.parse(storedLineList);
      this.lineList = Object.entries(storedLineListObj).map((_line) => {
        return new StationLine(_line[0], _line[1]);
      });
    }
  }

  convertLineListToObject() {
    const converted = {};
    this.lineList.forEach((_line) => {
      converted[_line.name] = _line.section;
    });

    return converted;
  }

  addLine(lineName, startStation, endStation) {
    const newLine = new StationLine(lineName, [startStation, endStation]);
    this.lineList.push(newLine);
    const convertedLineObject = this.convertLineListToObject();
    localStorage.lineList = JSON.stringify(convertedLineObject);
  }

  hasLineName(lineName) {
    for (let i = 0; i < this.lineList.length; i++) {
      if (this.lineList[i].name === lineName) {
        return true;
      }
    }
    return false;
  }

  fillLineNameTable($tbody) {
    $tbody.innerHTML = "";
    this.lineList.forEach((_line, _index) => {
      $tbody.innerHTML += `
        <tr>
          <td>${_line.name}</td>
          <td>${_line.section[0]}</td>
          <td>${_line.section[_line.section.length - 1]}</td>
          <td><button 
            class=${DELETE_BUTTONS_CLASS.lineDeleteButton}
            data-station-index=${_index}>삭제</button></td>
        </tr>
      `;
    });
  }

  renderLineNameTable() {
    const $tbody = document.getElementById("line-name-tbody");
    const $noLineMessage = getChildById(
      $tbody.parentElement.parentElement,
      NO_DATA_MESSAGE_ID.noLine
    );
    if (this.lineList.length === 0) {
      turnOnNoDataMessage($tbody.parentElement, $noLineMessage);
    } else {
      if (this.lineList.length === 1) {
        turnOffNoDataMessage($tbody.parentElement, $noLineMessage);
      }
      this.fillLineNameTable($tbody);
    }
  }
}
