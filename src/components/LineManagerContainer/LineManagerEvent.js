import LineManagerRender from "./LineManagerRender.js";
import { DOM_LINE, ERROR_MESSAGE } from "../../utils/constants.js";

export default class LineManagerEvent extends LineManagerRender {
  constructor(stateId) {
    super(stateId);
    console.log("--LineManagerEvent--");
    this.eventDOM();
  }

  eventDOM() {
    document
      .getElementById(DOM_LINE.LINE_NAME_FORM_ID)
      .addEventListener("submit", (e) => this._onSubmitLine(e));
  }

  _onSubmitLine(e) {
    e.preventDefault();

    const target = e.target;
    const lineName = target[0].value;
    const startStation = this.stations[target[1].options.selectedIndex];
    const endStation = this.stations[target[2].options.selectedIndex];

    const lineInfo = {
      lineName,
      line: [startStation, endStation],
    };
    target[0].value = "";

    if (!this.isValidLineInfo(lineInfo)) return;

    console.log(lineInfo);

    this.lines.push(lineInfo);
    this.lineListTrRender([lineInfo]);
    this.saveLocalStorageValue(this.localStorageKey, this.lines);
  }

  isValidLineInfo(lineInfo) {}

  _onClickDeleteLineTr(e) {
    super._onClickDeleteLineTr(e);
    console.dir(e.target);

    if (!window.confirm(ERROR_MESSAGE.DELETE_MSG_CONFIRM)) {
      return;
    }

    const targetTr = e.target.parentNode.parentNode;
    const lineName = targetTr.dataset["lineName"];

    this.deleteListTrData(lineName);
    targetTr.remove();
  }

  deleteListTrData(name) {
    this.lines = this.lines.filter((line) => line.lineName !== name);
    this.saveLocalStorageValue(this.localStorageKey, this.lines);
  }
}
