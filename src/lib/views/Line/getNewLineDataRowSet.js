import { DELETE_LINE_BUTTON } from "../../common/IdAndClassNames.js";
import Button from "../components/Button.js";

export default (lineDataList) =>
  lineDataList.map(({ lineName, startStation, endStation }, index) => {
    const $deleteStationButton = new Button(DELETE_LINE_BUTTON, "삭제", () =>
      // deleteLineName(lineName),
      console.log("삭제"),
    );
    $deleteStationButton.element.id = `${DELETE_LINE_BUTTON.substring(
      1,
    )}-${String(index)}`;
    return [lineName, startStation, endStation, $deleteStationButton.element];
  });
