import Typography from "../components/Typography.js";
import Select from "../components/Select.js";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import Div from "../components/Div.js";
import Section from "../../models/section.js";
import submitSectionData from "../../action/Section/submitSectionData.js";
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
    this.sectionStationSelector = new Select(SECTION_STATION_SELECTOR);
    this.lineName = lineName;
    this.sectionStationSelector.appendOptions();
    this.orderInput = new Input(SECTION_ORDER_INPUT, "순서", () =>
      submitSectionData(this._getNewSectionData()),
    );
    this.addSectionTitle = new Typography("구간 등록");
  }

  _getNewSectionData() {
    return new Section(
      this.sectionStationSelector.getSelectedValue(),
      this.orderInput.getValue(),
      this.lineName,
    );
  }

  _getAddSectionButton() {
    const $addSectionButton = new Button(ADD_SECTION_BUTTON, "등록", () =>
      submitSectionData(this._getNewSectionData()),
    );

    return $addSectionButton;
  }

  render() {
    [
      this.addSectionTitle,
      this.sectionStationSelector,
      this.orderInput,
      this._getAddSectionButton(),
    ].forEach(({ element }) =>
      this.inputContainer.element.appendChild(element),
    );
    return this.inputContainer.element;
  }
}
