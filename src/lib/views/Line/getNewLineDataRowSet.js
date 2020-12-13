import { DELETE_LINE_BUTTON } from "../../common/IdAndClassNames.js";
import deleteLineName from "../../_action/Line/deleteLineName.js";
import Button from "../components/Button.js";

export default (lineDataList) => lineDataList ?
  lineDataList.map(({ lineName, startStation, endStation }, index) => {
    const $deleteStationButton = new Button(DELETE_LINE_BUTTON, "삭제", () =>
      deleteLineName(lineName),
    );
    $deleteStationButton.element.id = `${DELETE_LINE_BUTTON.substring(
      1,
    )}-${String(index)}`;
    return [lineName, startStation, endStation, $deleteStationButton.element];
  }) : [];
