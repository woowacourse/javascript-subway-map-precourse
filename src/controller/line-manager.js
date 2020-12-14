import { Line, LineObject } from "../model/line.js";
import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { LineValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";
import { LineView } from "../view/line-view.js";

export const LineManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key);
    Line.lines = Storage.load(Line.key);
    LineView.render();
    this.setEventListener();
  },

  setEventListener() {
    // 추가
    Element.lineAddButton.addEventListener(Constant.CLICK, () => {
      this.onClickAddButton();
    });

    // 삭제
  },

  onClickAddButton() {
    const name = Element.lineNameInput.value;
    const start = Element.lineStartStationSelector.value;
    const end = Element.lineEndStationSelector.value;

    if (LineValidation.isValidLine(name, start, end)) {
      Line.add(new LineObject(name, start, end));
      LineView.render();
    }
    ElementControl.clearInput(Element.lineNameInput);
  },

  onClickDeleteButton() {},
};
