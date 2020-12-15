import SectionManagerRender from "./SectionManagerRender.js";
import { DOM_SECTION, ERROR_MESSAGE } from "../../utils/constants.js";

export default class SectionManagerEvent extends SectionManagerRender {
  constructor(stateId) {
    super(stateId);
  }

  _onClickMenuLine(e) {
    const selectedMenuDataset = e.target.dataset;
    this.enrollSection.innerHTML = this.sectionLineManagerRender(
      selectedMenuDataset.lineName
    );

    this.lineIndex = selectedMenuDataset.index;
    this.sectionLineManagerListRender(
      this.lines[this.lineIndex].line,
      this.lineIndex
    );

    document
      .getElementById(DOM_SECTION.SECTION_ADD_FORM_ID)
      .addEventListener("submit", (e) => this._onSubmitAddSection(e));
  }

  _onSubmitAddSection(e) {
    e.preventDefault();
    const target = e.target;
    const newSectionStation = this.stations[target[0].options.selectedIndex];
    const addPosition = target[1].value;

    target[1].value = "";
    target[0].options.selectedIndex = "0";

    if (!this.isVaildOrderNumber(addPosition, this.lineIndex)) return;

    if (
      this.isContinuousStationAdd(
        Number(addPosition),
        this.lines[this.lineIndex].line,
        newSectionStation
      )
    ) {
      window.alert(ERROR_MESSAGE.IS_CONTINUOUS_STAION_ADD);
      return;
    }

    this.lines[this.lineIndex].line.splice(addPosition, 0, newSectionStation);
    this.saveLocalStorageValue(this.localStorageKey, this.lines);

    document.getElementById(DOM_SECTION.SECTION_LIST_TBODY_ID).innerHTML = "";
    this.sectionLineManagerListRender(
      this.lines[this.lineIndex].line,
      this.lineIndex
    );
  }

  _onClickDeleteSection(e) {
    const target = e.target.parentNode.parentNode;
    const order = target.dataset.order;

    if (!window.confirm(ERROR_MESSAGE.DELETE_MSG_CONFIRM)) {
      return;
    }
    if (this.isMinSectionCount(this.lines[this.lineIndex].line.length)) {
      return;
    }

    target.remove();
    this.lines[this.lineIndex].line.splice(order, 1);
    this.saveLocalStorageValue(this.localStorageKey, this.lines);

    document.getElementById(DOM_SECTION.SECTION_LIST_TBODY_ID).innerHTML = "";
    this.sectionLineManagerListRender(
      this.lines[this.lineIndex].line,
      this.lineIndex
    );
  }
}
