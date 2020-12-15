import { appendChildren } from "../common/visualization";
import { createOneLineElements } from "../creators/map_print_creator";

const MapPrintContainer = function () {
  this.appendALineElement = (lines, parent) => {
    lines.forEach((line) => {
      const { lineTitle, lineUl, lineList } = createOneLineElements(line);
      appendChildren(lineUl, ...lineList);
      appendChildren(parent, lineTitle, lineUl);
    });
  };
};
