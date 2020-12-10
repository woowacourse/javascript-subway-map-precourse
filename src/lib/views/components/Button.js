import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Button {
  constructor(querySelector, buttonInnerText) {
    this.element = document.createElement("button");
    this.element.id =
      querySelector.charAt(0) === "#"
        ? getComponentIdOrClassQuerySelectorName(querySelector)
        : null;
    this.element.class =
      querySelector.charAt(0) === "."
        ? getComponentIdOrClassQuerySelectorName(querySelector)
        : null;
    this.element.innerText = buttonInnerText;
  }

  addRightSpace() {
    this.element.style = `margin-right: 3px;`;
  }

  addEventListener(callbackFunction) {
    this.element.addEventListener("click", callbackFunction);
  }
}
