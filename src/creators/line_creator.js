import { getFormattedLines, getFormattedStations } from "../common/function.js";
import {
  getAdvancedEle,
  createStationOptions,
  appendChildren,
  createTd,
  getTableHavingTableHead,
} from "../common/visualization.js";

const LineCreator = function () {
  this.createLineNameTitle = () =>
    getAdvancedEle("div", { class: "input-title" }, "노선 이름");

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

  this.createLineTableTitle = () =>
    getAdvancedEle("h2", null, "🚉 지하철 노선 목록");

  this.createLineDeleteButton = (lineName) =>
    getAdvancedEle(
      "button",
      { class: "line-delete-button", "data-line-name": lineName },
      "삭제"
    );

  this.createLineDeleteButtonTd = (lineName) => {
    const deleteButtonTd = createTd();
    const deleteButton = this.createLineDeleteButton(lineName);
    deleteButtonTd.appendChild(deleteButton);
    return deleteButtonTd;
  };

  this.createLineTr = (line) => {
    const tr = document.createElement("tr");
    const lineNameTd = createTd(line.name);
    const startStationTd = createTd(line.sections[0]);
    const endStationTd = createTd(line.sections[line.sections.length - 1]);
    const deleteButtonTd = this.createLineDeleteButtonTd(line.name);
    appendChildren(
      tr,
      lineNameTd,
      startStationTd,
      endStationTd,
      deleteButtonTd
    );
    return tr;
  };

  this.createTbody = () => {
    const tbody = document.createElement("tbody");
    const lines = getFormattedLines();
    const trs = lines.map((line) => this.createLineTr(line));
    appendChildren(tbody, ...trs);
    return tbody;
  };

  this.createLineTable = () => {
    const table = getTableHavingTableHead(
      "노선 이름",
      "상행 종점역",
      "하행 종점역",
      "설정"
    );
    const tbody = this.createTbody();
    table.appendChild(tbody);
    return table;
  };
};

export const {
  createLineAddDIV,
  createLineTableTitle,
  createLineTable,
  createLineTr,
} = new LineCreator();
