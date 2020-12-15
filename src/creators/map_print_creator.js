import { getAdvancedEle } from "../common/visualization.js";

const MapPrintCreator = function () {
  this.createLineTitle = (line) => getAdvancedEle("h2", null, line);
};
