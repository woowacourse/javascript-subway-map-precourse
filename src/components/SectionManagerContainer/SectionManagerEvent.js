import SectionManagerRender from "./SectionManagerRender.js";
import { DOM_SECTION } from "../../utils/constants.js";

export default class SectionManagerEvent extends SectionManagerRender {
  constructor(stateId) {
    super(stateId);
    console.log("--SectionManagerEvent--");
  }

  _onSubmitAddSection(e) {
    super._onSubmitAddSection(e);
    const target = e.target;
    const newSectionStation = this.stations[target[0].options.selectedIndex];
    const addPosition = target[1].value;

    target[1].value = "";
    target[0].options.selectedIndex = "0";

    this.lines[this.lineIndex].line.splice(addPosition, 0, newSectionStation);
    this.saveLocalStorageValue(this.localStorageKey, this.lines);

    document.getElementById(DOM_SECTION.SECTION_LIST_TBODY_ID).innerHTML = "";
    this.sectionLineManagerListRender(
      this.lines[this.lineIndex].line,
      this.lineIndex
    );
  }

  _onClickDeleteSection(e) {
    super._onClickDeleteSection(e);
    console.log(e.target.parentNode.parentNode);
    const target = e.target.parentNode.parentNode;
    const order = target.dataset.order;
    const linesIndex = target.dataset.linesIndex;
    console.log(target.dataset);
    console.log(order, linesIndex);

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
