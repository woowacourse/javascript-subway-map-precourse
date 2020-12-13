import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { StationValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";

export const StationManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
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
      // Station.add()
    }
    ElementControl.clearInput(Element.stationNameInput);
  },

  onClickRemoveBtn() { },
};
