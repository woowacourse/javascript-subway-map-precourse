import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Button {
  constructor(querySelector, buttonInnerText, callbackFunction) {
    const identifier = getComponentIdOrClassQuerySelectorName(querySelector);
    this.element = document.createElement("button");
    this.element.id = querySelector.charAt(0) === "#" ? identifier : null;
    this.element.class = querySelector.charAt(0) === "." ? identifier : null;
    this.element.innerText = buttonInnerText;
    this.element.onclick = callbackFunction;
    this.element.style = `margin: 3px;`;
  }

  render() {
    return this.element.outerHTML;
  }
}
