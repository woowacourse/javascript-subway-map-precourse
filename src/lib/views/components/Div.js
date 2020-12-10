import { getComponentQuerySelectorName } from "../utils/utils.js";

export default class Div {
  constructor(id) {
    this.element = document.createElement("div");
    this.element.id = getComponentQuerySelectorName(id);
  }

  getElement() {
    return this.element;
  }

  addToParentNode($parentNode) {
    $parentNode.appendChild(this.getElement());
  }

  addChildNodes($childNodes) {
    $childNodes.forEach(($childNode) => {
      this.getElement().append($childNode);
    });
  }
}