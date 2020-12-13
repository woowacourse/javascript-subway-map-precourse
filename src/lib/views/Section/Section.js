import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Div from "../components/Div.js";
import { lineSelector } from "../../_store/selectors.js";
import {
  SECTION_DIV,
  LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID,
  SECTION_INFO_INPUT_CONTAINER_ID,
  SECTION_LIST_VIEW_CONTAINER_ID,
  SELECT_LINE_BUTTON,
  SECTION_STATION_SELECTOR,
  SECTION_ORDER_INPUT,
  ADD_SECTION_BUTTON,
  DELETE_SECTION_BUTTON,
} from "../../common/IdAndClassNames.js";

// 버튼 누르면 현재 구간이 노출된다. 이전 뷰는 지우기

export default class Section {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = SECTION_DIV.substring(1);
  }

  _renderButton({ lineName }) {
    const $selectLineButton = new Button(SELECT_LINE_BUTTON, lineName, () =>
      console.log(lineName),
    );
    return $selectLineButton.element;
  }

  _getLineListViewButtonGroupContainer() {
    const $buttonGroupContainer = new Div(
      LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID,
    );

    lineSelector().forEach((lineData) =>
      $buttonGroupContainer.element.appendChild(this._renderButton(lineData)),
    );

    return $buttonGroupContainer.element;
  }

  _getSelectLineHelperText() {
    const $selectHelperText = new Typography(
      "구간을 수정할 노선을 선택해주세요.",
      "h3",
    );
    return $selectHelperText.element;
  }

  render() {
    [
      this._getSelectLineHelperText(),
      this._getLineListViewButtonGroupContainer(),
    ].forEach(($element) => this.element.appendChild($element));
    return this.element;
  }
}
