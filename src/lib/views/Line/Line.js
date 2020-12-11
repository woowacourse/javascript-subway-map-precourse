import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";
import Div from "../components/Div.js";

import {
  LINE_DIV,
  LINE_NAME_INPUT_CONTAINER_ID,
  LINE_INFO_INPUT_CONTAINER_ID,
  LINE_LIST_VIEW_CONTAINER_ID,
  LINE_NAME_INPUT,
  SELECT_START_STATION,
  SELECT_END_STATION,
  ADD_LINE_BUTTON,
  DELETE_LINE_BUTTON,
  STATION_NAME_INPUT,
  ADD_STATION_INPUT,
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

  // 노선 정보 업데이트 - 노선 리스트 중에 종점 선택

  // 노선 목록 정보 출력 및 삭제

  render() {
    this._getLineNameInputContainer();
    return this.element;
  }
}
