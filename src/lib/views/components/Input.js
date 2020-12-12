import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Input {
  constructor(id, helperText, callbackFunction) {
    this.element = document.createElement("input");
    this.element.id = getComponentIdOrClassQuerySelectorName(id);
    this.element.placeholder = helperText;
    this.element.type = "text";
    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") return callbackFunction(this.getValue());
    });
  }

  getValue() {
    return this.element.value;
  }

  render() {
    return this.element.outerHTML;
  }
}
