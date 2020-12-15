import {
  convertDataArrayToElementArray,
  getAdvancedEle,
} from "../common/visualization.js";

const MapPrintCreator = function () {
  this.createLineTitle = (line) => getAdvancedEle("h2", null, line);

  this.createOneLineElements = (line) => {
    const lineTitle = this.createLineTitle(line.name);
    const lineUl = document.createElement("ul");
    const lineList = convertDataArrayToElementArray("li", null, line.sections);
    return { lineTitle, lineUl, lineList };
  };
};

export const { createOneLineElements } = new MapPrintCreator();
