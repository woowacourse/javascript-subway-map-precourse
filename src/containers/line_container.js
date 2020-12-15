import { getFormattedStations } from "../common/function.js";
import { appendChildren } from "../common/visualization.js";
import {
  createLineAddDIV,
  createLineTableTitle,
  createLineTable,
  createLineTr,
} from "../creators/line_creator.js";
import { setLineDeleteButtonClickListener } from "../managers/line_manager.js";

const LineContainer = function () {
  this.appendNewLine = (input, startStation, endStation) => {
    const tbody = document.querySelector("tbody");
    const tr = createLineTr({
      name: input.value,
      sections: [startStation, endStation],
    });
    tbody.appendChild(tr);
    setLineDeleteButtonClickListener();
  };

  this.setDefaultValue = (input, startStationSelector, endStationSelector) => {
    input.value = "";
    const stations = getFormattedStations();
    const defaultValue = stations[0];
    startStationSelector.value = defaultValue;
    endStationSelector.value = defaultValue;
  };

  this.removeTr = (targetButton) => {
    const tr = targetButton.parentElement.parentElement;
    const tbody = document.querySelector("tbody");
    tbody.removeChild(tr);
  };

  this.renderInitialLine = (parent) => {
    const LineAddDIV = createLineAddDIV();
    const tableTitle = createLineTableTitle();
    const table = createLineTable();
    appendChildren(parent, LineAddDIV, tableTitle, table);
  };
};

export const {
  removeTr,
  appendNewLine,
  setDefaultValue,
  renderInitialLine,
} = new LineContainer();
