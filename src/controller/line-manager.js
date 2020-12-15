import { Line, LineObject } from "../model/line.js";
import { Station } from "../model/station.js";
import { ConfirmMessage, Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { LineValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";
import { LineView } from "../view/line-view.js";

export const LineManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key)
      ? Storage.load(Station.key)
      : [];
    Line.lines = Storage.load(Line.key) ? Storage.load(Line.key) : [];
    LineView.render();
    this.setEventListener();
  },

  setEventListener() {
    Element.lineAddButton.addEventListener(Constant.CLICK, () => {
      this.onClickAddButton();
    });

    Element.lineContainer
      .querySelector(Constant.TBODY)
      .addEventListener(Constant.CLICK, (e) => {
        this.onClickDeleteButton(e);
      });
  },

  onClickAddButton() {
    const name = Element.lineNameInput.value;
    const start = Element.lineStartStationSelector.value;
    const end = Element.lineEndStationSelector.value;

    if (LineValidation.isValidLine(name, start, end)) {
      Line.add(new LineObject(name, start, end));
    }
    LineView.render();
    ElementControl.clearInput(Element.lineNameInput);
  },

  onClickDeleteButton(e) {
    const name = e.target.dataset.name;

    if (e.target.tagName !== Constant.BUTTON) {
      return;
    }

    if (confirm(ConfirmMessage.CHECK_DELETION)) {
      Line.delete(name);
      LineView.render();
    }
  },
};
