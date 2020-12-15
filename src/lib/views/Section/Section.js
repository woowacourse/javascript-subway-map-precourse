import Typography from "../components/Typography.js";
import Button from "../components/Button.js";
import Div from "../components/Div.js";
import ViewUpdateSectionManager from "./ViewUpdateSectionManager.js";
import { lineSelector } from "../../store/selectors.js";
import {
  SECTION_DIV,
  LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID,
  SELECT_LINE_BUTTON,
  SECTION_MANAGER_CONTAINER,
} from "../../common/IdAndClassNames.js";
import { sectionHelperText } from "../common/helperTexts.js";
import NotExistErrorMessage from "../common/NotExistErrorMessage.js";

export default class Section {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = SECTION_DIV.substring(1);
    this.sectionManagerContainer = new Div(SECTION_MANAGER_CONTAINER);
  }

  _renderButton(lineData) {
    const { lineName } = lineData;
    const $selectLineButton = new Button(SELECT_LINE_BUTTON, lineName, () => {
      const $updateSectionManager = new ViewUpdateSectionManager(lineData);
      this.sectionManagerContainer.element.innerHTML = "";
      this.sectionManagerContainer.element.appendChild(
        $updateSectionManager.render(),
      );
    });
    return $selectLineButton.element;
  }

  _getLineListViewButtonGroupContainer() {
    const $buttonGroupContainer = new Div(
      LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID,
    );

    lineSelector().forEach((lineData) =>
      $buttonGroupContainer.element.appendChild(this._renderButton(lineData)),
    );

    return $buttonGroupContainer.element;
  }

  _getSelectLineHelperText() {
    const $selectHelperText = new Typography(sectionHelperText["title"], "h3");
    return $selectHelperText.element;
  }

  _renderEditComponent() {
    [
      this._getSelectLineHelperText(),
      this._getLineListViewButtonGroupContainer(),
      this.sectionManagerContainer.element,
    ].forEach(($element) => this.element.appendChild($element));
  }

  _renderEmptyMessage() {
    this.element.appendChild(NotExistErrorMessage());
  }

  render() {
    if (lineSelector().length > 0) this._renderEditComponent();
    else this._renderEmptyMessage();
    return this.element;
  }
}
