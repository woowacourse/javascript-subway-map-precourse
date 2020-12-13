import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";
import Div from "../components/Div.js";

import {
  LINE_DIV,
  LINE_NAME_INPUT_CONTAINER_ID,
  LINE_NAME_INPUT,
  LINE_LIST_VIEW_CONTAINER_ID,
  DELETE_LINE_BUTTON,
} from "../../common/IdAndClassNames.js";

import submitLineName from "../../_action/Line/submitLineName.js";

export default class Line {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_DIV.substring(1);
  }

  // 노선 이름 입력
  _getLineNameInputContainerChildNodes() {
    const $inputHelperText = new Typography("노선 이름", "p");
    const $lineNameInput = new Input(
      LINE_NAME_INPUT,
      "노선 이름을 입력해주세요.",
      () => submitLineName($lineNameInput.getValue()),
    );

    return [$inputHelperText, $lineNameInput];
  }

  _getLineNameInputContainer() {
    const $lineNameInputContainer = new Div(LINE_NAME_INPUT_CONTAINER_ID);
    this._getLineNameInputContainerChildNodes().forEach(({ element }) => {
      $lineNameInputContainer.element.appendChild(element);
    });
    this.element.appendChild($lineNameInputContainer.element);
  }

  // 노선 목록 정보 출력 및 삭제

  render() {
    this._getLineNameInputContainer();
    return this.element;
  }
}
