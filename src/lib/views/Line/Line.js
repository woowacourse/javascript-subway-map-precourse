import Typography from "../components/Typography.js";

import {
  LINE_DIV,
  LINE_LIST_VIEW_CONTAINER_ID,
  DELETE_LINE_BUTTON,
} from "../../common/IdAndClassNames.js";

export default class Line {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_DIV.substring(1);
  }

  _getLineInfoList() {
    const $title = new Typography("🚉 지하철 역 목록", "h2");
    return $title.element;
  }

  render() {
    [this._getLineInfoList()].forEach(($element) =>
      this.element.appendChild($element),
    );
    return this.element;
  }
}
