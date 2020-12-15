import { getFormattedLines } from "../common/function.js";
import { appendChildren } from "../common/visualization.js";
import { createOneLineElements } from "../creators/map_print_creator.js";

const MapPrintContainer = function () {
  this.appendALineElement = (lines, parent) => {
    lines.forEach((line) => {
      const { lineTitle, lineUl, lineList } = createOneLineElements(line);
      appendChildren(lineUl, ...lineList);
      appendChildren(parent, lineTitle, lineUl);
    });
  };

  this.renderMapPrint = (parent) => {
    const lines = getFormattedLines();
    this.appendALineElement(lines, parent);
  };
};

export const { renderMapPrint } = new MapPrintContainer();
