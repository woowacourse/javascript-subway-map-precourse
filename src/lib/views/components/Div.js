import { getComponentQuerySelectorName } from "../utils/domManipulationFunctions.js";

export default class Div {
  constructor(id) {
    this.element = document.createElement("div");
    this.element.id = getComponentQuerySelectorName(id);
  }

  getElement() {
    return this.element;
  }

  addChildNodes($childNodes) {
    $childNodes.forEach(($childNode) => {
      this.getElement().append($childNode);
    });
  }
}