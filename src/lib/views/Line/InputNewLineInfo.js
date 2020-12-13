import Select from "../components/Select.js";
import Typography from "../components/Typography.js";

import {
  LINE_INFO_INPUT_CONTAINER_ID,
  LINE_NAME_INPUT,

  SELECT_START_STATION,
  SELECT_END_STATION,
  ADD_LINE_BUTTON,
} from "../../common/IdAndClassNames.js";

export default class InputNewLineInfo {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_INFO_INPUT_CONTAINER_ID;
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

  render() {
    [
      this._getSelectStartStation(),
      this._getSelectEndStation(),
    ].forEach(($element) => this.element.appendChild($element));

    return this.element;
  }
}
