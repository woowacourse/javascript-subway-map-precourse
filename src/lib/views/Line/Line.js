import InputNewLineInfo from "./InputNewLineInfo.js";
import Table from "../components/Table/Table.js";
import { LINE_DIV } from "../../common/IdAndClassNames.js";

export default class Line {
  constructor() {
    this.tabIndex = 1;
    this.element = document.createElement("div");
    this.element.id = LINE_DIV.substring(1);
    this.table = new Table({ tabIndex: 1 });
  }

  _getLineInfoInputFormContainer() {
    const $lineInfoInputFormContainer = new InputNewLineInfo();
    return $lineInfoInputFormContainer.render();
  }

  render() {
    [
      this._getLineInfoInputFormContainer(),
      this.table.render(),
    ].forEach(($element) => this.element.appendChild($element));
    return this.element;
  }
}
