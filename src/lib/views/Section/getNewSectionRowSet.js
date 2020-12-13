import Button from "../components/Button.js";
import { DELETE_SECTION_BUTTON } from "../../common/IdAndClassNames.js";
import deleteSectionData from "../../_action/Section/deleteSectionData.js";

export default (lineName, stationDataList) =>
  stationDataList
    ? stationDataList.map((stationName, index) => {
        const $deleteSectionButton = new Button(
          DELETE_SECTION_BUTTON,
          "삭제",
          () => deleteSectionData(stationName, lineName),
        );
        $deleteSectionButton.element.id = `${DELETE_SECTION_BUTTON.substring(
          1,
        )}-${String(index)}`;
        return [index, stationName, $deleteSectionButton.element];
      })
    : [];
