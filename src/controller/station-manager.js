import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
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
      this.onClickAddBtn();
    });

    // 삭제
  },

  onClickAddBtn() {
    const name = Element.stationNameInput.value;

    if (StationValidation.isValidStation(name)) {
      Station.add(name);
      StationView.render();
    }
    ElementControl.clearInput(Element.stationNameInput);
  },

  onClickRemoveBtn() {},
};
