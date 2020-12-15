import { appendChildren } from "../common/visualization.js";
import {
  createLineAddDIV,
  createLineTableTitle,
  createLineTable,
} from "../creators/line_creator.js";

const LineContainer = function () {
  this.renderInitialLine = (parent) => {
    const LineAddDIV = createLineAddDIV();
    const tableTitle = createLineTableTitle();
    const table = createLineTable();
    appendChildren(parent, LineAddDIV, tableTitle, table);
  };
};
