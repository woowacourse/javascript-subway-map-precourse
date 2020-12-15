import {
  createAddDiv,
  createTableTitle,
  createTr,
  createTbody,
} from "../creators/station_creator.js";
import {
  getFormattedStations,
  getTableHavingTableHead,
} from "../common/function.js";
import { appendRecursiveChild } from "../common/visualization.js";

const StationContainer = function () {
  this.appendNewTr = (station) => {
    const tr = createTr(station);
    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
  };

  this.clearInputValue = (input) => {
    input.value = "";
  };

  this.removeTr = (targetButton) => {
    const tr = targetButton.parentElement.parentElement;
    const tbody = tr.parentElement;
    tbody.removeChild(tr);
  };

  this.renderStation = (parent) => {
    const addDiv = createAddDiv();
    const tableTitle = createTableTitle();
    const table = getTableHavingTableHead("역 이름", "설정");
    const formattedStations = getFormattedStations();
    const tbody = createTbody(formattedStations);
    appendRecursiveChild(parent, addDiv, tableTitle, [table, tbody]);
  };
};

export const {
  appendNewTr,
  clearInputValue,
  removeTr,
} = new StationContainer();
