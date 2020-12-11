import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Input {
  constructor(id) {
    this.element = document.createElement("input");
    this.element.id = getComponentIdOrClassQuerySelectorName(id);
  }

  getValue() {
    return this.element.value;
  }

  removeValue() {
    this.element.value = "";
  }

  addEventListener(callbackFunction) {
    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") return callbackFunction;
    });
  }
}
