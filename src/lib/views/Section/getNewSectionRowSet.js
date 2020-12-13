import Button from "../components/Button.js";
import { DELETE_SECTION_BUTTON } from "../../common/IdAndClassNames.js";

export default (lineName, stationDataList) =>
  stationDataList
    ? stationDataList.map((stationName, index) => {
        const $deleteSectionButton = new Button(
          DELETE_SECTION_BUTTON,
          "삭제",
          () => console.log(`${lineName} 부터 ${stationName} 삭제`),
        );
        $deleteSectionButton.element.id = `${DELETE_SECTION_BUTTON.substring(
          1,
        )}-${String(index)}`;
        return [index, stationName, $deleteSectionButton.element];
      })
    : [];
