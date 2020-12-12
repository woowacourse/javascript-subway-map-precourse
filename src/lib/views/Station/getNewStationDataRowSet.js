import { DELETE_STATION_INPUT } from "../../common/IdAndClassNames.js";
import Button from "../components/Button.js";
import deleteStationName from "../../_action/Station/deleteStationName.js";

export default (stationDataList) =>
  stationDataList.map((stationName, index) => {
    const $deleteStationButton = new Button(DELETE_STATION_INPUT, "삭제", () =>
      deleteStationName(stationName, index),
    );
    $deleteStationButton.element.id = `${DELETE_STATION_INPUT.substring(
      1,
    )}-${String(index)}`;
    return [stationName, $deleteStationButton.element];
  });
