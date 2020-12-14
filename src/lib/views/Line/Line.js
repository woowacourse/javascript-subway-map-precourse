import InputNewLineInfo from "./InputNewLineInfo.js";
import { LINE_DIV } from "../../common/IdAndClassNames.js";

export default class Line {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_DIV.substring(1);
  }

  _getLineInfoInputFormContainer() {
    const $lineInfoInputFormContainer = new InputNewLineInfo();
    return $lineInfoInputFormContainer.render();
  }

  render() {
    [this._getLineInfoInputFormContainer()].forEach(($element) =>
      this.element.appendChild($element),
    );
    return this.element;
  }
}
