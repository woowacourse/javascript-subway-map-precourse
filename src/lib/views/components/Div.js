import { getComponentIdOrClassQuerySelectorName } from "../common/utils.js";

export default class Div {
  constructor(id) {
    this.element = document.createElement("div");
    this.element.id = getComponentIdOrClassQuerySelectorName(id);
  }

  render() {
    return this.element.outerHTML;
  }
}
