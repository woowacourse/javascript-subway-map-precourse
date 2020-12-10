import { getComponentQuerySelectorName } from "../utils/domManipulationFunctions.js";

export default class Button {
  constructor(querySelector, buttonInnerText) {
    this.element = document.createElement("button");
    this.element.id =
      querySelector.charAt(0) === "#"
        ? getComponentQuerySelectorName(querySelector)
        : null;
    this.element.class =
      querySelector.charAt(0) === "."
        ? getComponentQuerySelectorName(querySelector)
        : null;
    this.element.innerText = buttonInnerText;
  }

  getElement() {
    return this.element;
  }

  addRightSpace() {
    this.getElement().style = `margin-right: 3px;`;
  }
}
