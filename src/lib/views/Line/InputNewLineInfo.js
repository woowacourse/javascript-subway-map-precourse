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

import { LINE_TAB_INDEX } from "../../common/constants.js";
import { stationLineHelperTexts } from "../common/helperTexts.js";

import submitLineName from "../../action/Line/submitLineName.js";
import submitNewLine from "../../action/Line/submitNewLine.js";

const helperText = stationLineHelperTexts(LINE_TAB_INDEX);

export default class InputNewLineInfo {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_INFO_INPUT_CONTAINER_ID;
    this.lineNameInput = new Input(
      LINE_NAME_INPUT,
      helperText["inputPlaceHolder"],
      () => submitLineName(this.lineNameInput.getValue()),
    );
    this.selectStartStation = new Select(SELECT_START_STATION);
    this.selectEndStation = new Select(SELECT_END_STATION);
  }

  _getSelectStartStation() {
    const $selectStartStationHelper = new Typography(
      helperText["startStation"],
    );
    this.selectStartStation.appendOptions();
    $selectStartStationHelper.element.appendChild(
      this.selectStartStation.element,
    );
    return $selectStartStationHelper.element;
  }

  _getSelectEndStation() {
    const $selectEndStationHelper = new Typography(helperText["endStation"]);
    this.selectEndStation.appendOptions();
    $selectEndStationHelper.element.appendChild(this.selectEndStation.element);
    return $selectEndStationHelper.element;
  }

  _getNewLineSubmitInfoButton() {
    const $submitNewLineInfoButton = new Button(
      ADD_LINE_BUTTON,
      helperText["addButtonText"],
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
    const $lineNameHelperText = new Typography(helperText["inputHelper"]);
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
