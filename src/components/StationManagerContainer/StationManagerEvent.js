import StationManagerRender from "./StationManagerRender.js";
import { DOM_STATION, ERROR_MESSAGE } from "../../utils/constants.js";

export default class StationManagerEvent extends StationManagerRender {
  constructor(stateId) {
    super(stateId);
    console.log("--StationManagerEvent--");
    this.eventDOM();
  }

  eventDOM() {
    document
      .getElementById(DOM_STATION.STATION_FORM_ID)
      .addEventListener("submit", (e) => this._onSubmitStationName(e));
  }

  _onSubmitStationName(e) {
    e.preventDefault();
    const target = e.target;
    const stationNameInput = target[0];
    const stationName = stationNameInput.value;

    stationNameInput.value = "";
    if (!this.isValidStationName(stationName)) return;

    this.localStorageItemAdd(stationName);
    this.stationListTrRender([stationName]);
  }

  isValidStationName() {}

  localStorageItemAdd(item) {}

  _onClickDeleteTr(e) {
    super._onClickDeleteTr(e);

    if (!window.confirm(ERROR_MESSAGE.DELETE_MSG_CONFIRM)) {
      return;
    }

    const targetTr = e.target.parentNode.parentNode;
    const stationName = targetTr.dataset["stationName"];

    if (this.isUsedLine(stationName)) {
      window.alert(ERROR_MESSAGE.IS_USED_LINE);
      return;
    }

    this.deleteTrData(stationName);
    targetTr.remove();
  }

  deleteTrData(stationName) {}

  isUsedLine(stationName) {}
}
