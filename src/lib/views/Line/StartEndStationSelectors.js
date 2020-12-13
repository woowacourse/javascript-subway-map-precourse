import Button from "../components/Button.js";
import Select from "../components/Select.js";
import Typography from "../components/Typography.js";
import Line from "../../models/line.js";
import submitNewLine from "../../_action/Line/submitNewLine.js";
import {
  LINE_INFO_INPUT_CONTAINER_ID,
  SELECT_START_STATION,
  SELECT_END_STATION,
  ADD_LINE_BUTTON,
} from "../../common/IdAndClassNames.js";

export default class StartEndStationSelectors {
  constructor(lineName) {
    this.lineInfo = new Line(lineName);
    this.element = document.createElement("div");
    this.element.id = LINE_INFO_INPUT_CONTAINER_ID;
    this.selectStartStation = new Select(SELECT_START_STATION);
    this.selectEndStation = new Select(SELECT_END_STATION);
    this.submitNewLineButton = new Button(ADD_LINE_BUTTON, "노선 추가", () =>
      submitNewLine(this.lineInfo),
    );
  }

  _getSelectStartStation() {
    const $selectStartStationHelper = new Typography("상행 종점");
    $selectStartStationHelper.element.appendChild(
      this.selectStartStation.element,
    );
    return $selectStartStationHelper.element;
  }

  _getSelectEndStation() {
    const $selectEndStationHelper = new Typography("하행 종점");
    $selectEndStationHelper.element.appendChild(this.selectEndStation.element);
    return $selectEndStationHelper.element;
  }

  render() {
    [
      this._getSelectStartStation(),
      this._getSelectEndStation(),
      this.submitNewLineButton.element,
    ].forEach(($element) => this.element.appendChild($element));

    return this.element;
  }
}
