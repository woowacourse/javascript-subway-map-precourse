import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Button {
  constructor(querySelector, buttonInnerText, callbackFunction) {
    const identifier = getComponentIdOrClassQuerySelectorName(querySelector);
    const isDeleteButton = querySelector.charAt(0) === ".";
    this.element = document.createElement("button");
    this.element.id = !isDeleteButton ? identifier : null;
    this.element.innerText = buttonInnerText;
    this.element.onclick = callbackFunction;
    this.element.style = !isDeleteButton ? `margin: 3px;` : null;
    if (isDeleteButton) this.element.classList.add(identifier);
  }

  render() {
    return this.element.outerHTML;
  }
}
