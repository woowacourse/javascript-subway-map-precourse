import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";
import submitStationName from "../../_action/Station/submitStationName.js";

import {
  STATION_NAME_INPUT_CONTAINER_ID,
  STATION_LIST_VIEW_CONTAINER_ID,
  STATION_NAME_INPUT,
  ADD_STATION_INPUT,
  DELETE_STATION_INPUT,
} from "../../common/IdAndClassNames.js";

export default class Station {
  constructor() {
    this.inputContainerId = STATION_NAME_INPUT_CONTAINER_ID;
    this.showStationListContainerId = STATION_LIST_VIEW_CONTAINER_ID;
  }

  // 역 이름 입력
  _getStationInputContainer() {
    const $inputHelperText = new Typography("역 이름", "p");
    const $stationNameInput = new Input(
      STATION_NAME_INPUT,
      "역 이름을 입력해주세요.",
    );
    const $stationNameInputButton = new Button(
      ADD_STATION_INPUT,
      "역 추가",
      submitStationName("hi"),
    );

    $stationNameInputButton.element.onclick = alert("hello");

    return (
      $inputHelperText.render() +
      $stationNameInput.render() +
      $stationNameInputButton.render()
    );
  }

  // 역 목록 출력
  _getStationListViewContainer() {
    const $title = new Typography("지하철 역 목록", "h2");
    return $title.render();
  }

  render() {
    return `
      <div id="${this.inputContainerId}">
        ${this._getStationInputContainer()}
      </div>
      <div id="${this.showStationListContainerId}">
        ${this._getStationListViewContainer()}
      </div>
    `;
  }
}
