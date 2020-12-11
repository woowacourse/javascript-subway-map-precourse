import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Input {
  constructor(id, helperText) {
    this.element = document.createElement("input");
    this.element.id = getComponentIdOrClassQuerySelectorName(id);
    this.element.placeholder = helperText;
    this.element.type = "text";
  }

  getValue() {
    return this.element.value;
  }

  removeValue() {
    this.element.value = "";
  }

  addEventListener(callbackFunction) {
    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") return callbackFunction(this.getValue());
    });
  }

  render() {
    return this.element.outerHTML;
  }
}
