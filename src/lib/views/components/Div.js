import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Div {
  constructor(id) {
    this.element = document.createElement("div");
    this.element.id = getComponentIdOrClassQuerySelectorName(id);
  }

  addToParentNode($parentNode) {
    $parentNode.appendChild(this.element);
  }

  addChildNodes($childNodes) {
    $childNodes.forEach(($childNode) => {
      this.element.append($childNode);
    });
  }
}
