import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Input from "../components/Input.js";
import Table from "../components/Table.js";
import Div from "../components/Div.js";
import getNewStationDataRowSet from "./getNewStationDataRowSet.js";
import submitStationName from "../../_action/Station/submitStationName.js";
import { stationSelector } from "../../_store/selectors.js";

import {
  STATION_DIV,
  STATION_NAME_INPUT_CONTAINER_ID,
  STATION_LIST_VIEW_CONTAINER_ID,
  STATION_NAME_INPUT,
  ADD_STATION_INPUT,
  STATION_LIST,
} from "../../common/IdAndClassNames.js";

export default class Station {
  constructor() {
    this.stationDataList = stationSelector();
    this.stationDataListIsEmpty =
      this.stationDataList === null || this.stationDataList.length === 0;
    this.element = document.createElement("div");
    this.element.id = STATION_DIV.substring(1);
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
    this.element.appendChild($stationInputContainer.element);
  }

  _getStationListViewContainerChildNodes() {
    const $title = new Typography("🚉 지하철 역 목록", "h2");
    const $stationDataListTable = new Table(STATION_LIST);
    $stationDataListTable.insertTableHeader(["역 이름", "설정"]);
    $stationDataListTable.insertTableData(
      getNewStationDataRowSet(
        this.stationDataList,
        this.stationDataListIsEmpty,
      ),
    );
    return [$title, $stationDataListTable];
  }

  _getStationListViewContainer() {
    const $stationListViewContainer = new Div(STATION_LIST_VIEW_CONTAINER_ID);
    this._getStationListViewContainerChildNodes().forEach(({ element }) => {
      $stationListViewContainer.element.appendChild(element);
    });
    this.element.appendChild($stationListViewContainer.element);
  }

  render() {
    this._getStationInputContainer();
    this._getStationListViewContainer();
    return this.element;
  }
}
