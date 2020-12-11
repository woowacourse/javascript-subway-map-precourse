import Typography from "../components/Typography.js";
import Div from "../components/Div.js";
import {
  SECTION_DIV,
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
    this.element = document.createElement("div");
    this.element.id = SECTION_DIV.substring(1);
  }

  // 현재 버튼 렌더링
  _getLineListViewButtonGroupContainerChildNodes() {
    const $selectHelperText = new Typography(
      "구간을 수정할 노선을 선택해주세요.",
      "h3",
    );

    return [$selectHelperText];
  }

  _getLineListViewButtonGroupContainer() {
    const $lineListViewButtonsContainer = new Div(
      LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID,
    );
    this._getLineListViewButtonGroupContainerChildNodes().forEach(
      ({ element }) => {
        $lineListViewButtonsContainer.element.appendChild(element);
      },
    );
    this.element.appendChild($lineListViewButtonsContainer.element);
  }

  // 구간 정보 입력 관리

  // 출력 파트 관리

  render() {
    this._getLineListViewButtonGroupContainer();
    return this.element;
  }
}
