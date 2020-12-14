import { Station } from "../model/station.js";
import { ConfirmMessage, Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { StationValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";
import { StationView } from "../view/station-view.js";

export const StationManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key);
    StationView.render();
    this.setEventListener();
  },

  setEventListener() {
    // 추가
    Element.stationAddButton.addEventListener(Constant.CLICK, () => {
      this.onClickAddButton();
    });

    // 삭제
    // Element.stationDeleteButton
    // document.querySelector(Constant.STATION_DELELE_BUTTON_CLASS).addEventListener(Constant.CLICK, (e) => {
    //   this.onClickDeleteBtn(e);
    // });
    Element.stationContainer
      .querySelector(Constant.TBODY)
      .addEventListener(Constant.CLICK, (e) => {
        this.onClickDeleteButton(e);
      });
  },

  onClickAddButton() {
    const name = Element.stationNameInput.value;

    if (StationValidation.isValidStation(name)) {
      Station.add(name);
      StationView.render();
    }
    ElementControl.clearInput(Element.stationNameInput);
  },

  onClickDeleteButton(e) {
    const name = e.target.dataset.name;

    if (confirm(ConfirmMessage.CHECK_DELETION)) {
      Station.delete(name);
      StationView.render();
    }
  },
};
