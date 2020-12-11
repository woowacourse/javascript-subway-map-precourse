import Typography from "../components/Typography.js";
import {
  LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID,
  SECTION_INFO_INPUT_CONTAINER_ID,
  SECTION_LIST_VIEW_CONTAINER_ID,
  SELECT_LINE_BUTTON,
  SECTION_STATION_SELECTOR,
  SECTION_ORDER_INPUT,
  ADD_SECTION_BUTTON,
  DELETE_SECTION_BUTTON,
} from "../../common/IdAndClassNames.js";

export default class Section {
  constructor() {
    this.lineListViewButtonsContainerId = LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID;
    this.sectionInfoInputContainerId = SECTION_INFO_INPUT_CONTAINER_ID;
    this.sectionListViewContainerId = SECTION_LIST_VIEW_CONTAINER_ID;
  }

  _lineListViewButtonsContainer() {
    const $selectHelperText = new Typography(
      "구간을 수정할 노선을 선택해주세요.",
      "h3",
    );

    return $selectHelperText.element.outerHTML;
  }

  render() {
    return `
      <div id = "${this.lineListViewButtonsContainerId}">
        ${this._lineListViewButtonsContainer()}
      </div>
      <div id = "${this.sectionInfoInputContainerId}"></div>
      <div id = "${this.sectionListViewContainerId}"></div>
    `;
  }
}
