import Line from "../../models/line.js";
import Select from "../components/Select.js";
import Button from "../components/Button.js";
import Typography from "../components/Typography.js";
import Input from "../components/Input.js";

import {
  LINE_INFO_INPUT_CONTAINER_ID,
  LINE_NAME_INPUT,
  SELECT_START_STATION,
  SELECT_END_STATION,
  ADD_LINE_BUTTON,
} from "../../common/IdAndClassNames.js";

import submitLineName from "../../_action/Line/submitLineName.js";
import submitNewLine from "../../_action/Line/submitNewLine.js";

export default class InputNewLineInfo {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_INFO_INPUT_CONTAINER_ID;
    this.lineNameInput = new Input(
      LINE_NAME_INPUT,
      "노선 이름을 입력해주세요.",
      () => submitLineName(this.lineNameInput.getValue()),
    );
    this.selectStartStation = new Select(SELECT_START_STATION);
    this.selectEndStation = new Select(SELECT_END_STATION);
  }

  _getSelectStartStation() {
    const $selectStartStationHelper = new Typography("상행 종점 ");
    this.selectStartStation.appendOptions();
    $selectStartStationHelper.element.appendChild(
      this.selectStartStation.element,
    );
    return $selectStartStationHelper.element;
  }

  _getSelectEndStation() {
    const $selectEndStationHelper = new Typography("하행 종점 ");
    this.selectEndStation.appendOptions();
    $selectEndStationHelper.element.appendChild(this.selectEndStation.element);
    return $selectEndStationHelper.element;
  }

  _getNewLineSubmitInfoButton() {
    const $submitNewLineInfoButton = new Button(
      ADD_LINE_BUTTON,
      "노선 추가",
      () =>
        submitNewLine(
          new Line({
            lineName: this.lineNameInput.getValue(),
            startStation: this.selectStartStation.getSelectedValue(),
            endStation: this.selectEndStation.getSelectedValue(),
          }),
        ),
    );
    return $submitNewLineInfoButton.element;
  }

  render() {
    const $lineNameHelperText = new Typography("노선 이름");
    [
      $lineNameHelperText.element,
      this.lineNameInput.element,
      this._getSelectStartStation(),
      this._getSelectEndStation(),
      this._getNewLineSubmitInfoButton(),
    ].forEach(($element) => this.element.appendChild($element));

    return this.element;
  }
}
