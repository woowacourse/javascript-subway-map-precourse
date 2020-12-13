import Typography from "../components/Typography.js";
import Div from "../components/Div.js";
import {
  SECTION_INFO_INPUT_CONTAINER_ID,
  SECTION_STATION_SELECTOR,
  SECTION_ORDER_INPUT,
  ADD_SECTION_BUTTON,
} from "../../common/IdAndClassNames.js";

export default class InputNewSectionInfo {
  constructor(props) {
    const { lineName } = props;
    this.inputContainer = new Div(SECTION_INFO_INPUT_CONTAINER_ID);
    this.addSectionTitle = new Typography("구간 등록");
  }

  render() {
    [this.addSectionTitle.element].forEach(($element) =>
      this.inputContainer.element.appendChild($element),
    );
    return this.inputContainer.element;
  }
}
