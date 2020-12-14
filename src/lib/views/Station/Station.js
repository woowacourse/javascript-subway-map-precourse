import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";
import Div from "../components/Div.js";
import Table from "../components/Table/Table.js";
import submitStationName from "../../_action/Station/submitStationName.js";

import {
  STATION_DIV,
  STATION_NAME_INPUT_CONTAINER_ID,
  STATION_NAME_INPUT,
  ADD_STATION_INPUT,
} from "../../common/IdAndClassNames.js";

export default class Station {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = STATION_DIV.substring(1);
    this.table = new Table({ tabIndex: 0 });
  }

  _getStationInputContainerChildNodes() {
    const $inputHelperText = new Typography("역 이름", "p");
    const $stationNameInput = new Input(
      STATION_NAME_INPUT,
      "역 이름을 입력해주세요.",
      () => submitStationName($stationNameInput.getValue()),
    );
    const $stationNameInputButton = new Button(
      ADD_STATION_INPUT,
      "역 추가",
      () => submitStationName($stationNameInput.getValue()),
    );
    return [$inputHelperText, $stationNameInput, $stationNameInputButton];
  }

  _getStationInputContainer() {
    const $stationInputContainer = new Div(STATION_NAME_INPUT_CONTAINER_ID);
    this._getStationInputContainerChildNodes().forEach(({ element }) => {
      $stationInputContainer.element.appendChild(element);
    });
    return $stationInputContainer.element;
  }

  render() {
    [
      this._getStationInputContainer(),
      this.table.render(),
    ].forEach(($element) => this.element.appendChild($element));
    return this.element;
  }
}
