import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";

import {
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

export default class Line {
  constructor() {
    this.lineNameInputContainerId = LINE_NAME_INPUT_CONTAINER_ID;
    this.lineInfoInputContainerId = LINE_INFO_INPUT_CONTAINER_ID;
    this.lineListViewContainerId = LINE_LIST_VIEW_CONTAINER_ID;
  }

  _getLineNameInputContainer() {
    const $inputHelperText = new Typography("노선 이름", "p");
    const $lineNameInput = new Input(
      LINE_NAME_INPUT,
      "노선 이름을 입력해주세요.",
    );

    return $inputHelperText.render() + $lineNameInput.render();
  }

  render() {
    return `
      <div id="${this.lineNameInputContainerId}">
        ${this._getLineNameInputContainer()}
      </div>
      <div id="${this.lineInfoInputContainerId}"></div>
      <div id="${this.lineListViewContainerId}"></div>
    `;
  }
}
