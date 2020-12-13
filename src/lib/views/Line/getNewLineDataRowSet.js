import { DELETE_LINE_BUTTON } from "../../common/IdAndClassNames.js";
import deleteLineName from "../../_action/Line/deleteLineName.js";
import Button from "../components/Button.js";

export default (lineDataList) => lineDataList ?
  lineDataList.map(({ lineName, stations }) => {
    const $deleteStationButton = new Button(DELETE_LINE_BUTTON, "삭제", () =>
      deleteLineName(lineName),
    );
    return [lineName, stations[0], stations[stations.length-1], $deleteStationButton.element];
  }) : [];
