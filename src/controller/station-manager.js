import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { ConfirmMessage, Constant, ErrorMessage } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { StationValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";
import { StationView } from "../view/station-view.js";

export const StationManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key)
      ? Storage.load(Station.key)
      : [];
    Line.lines = Storage.load(Line.key) ? Storage.load(Line.key) : [];
    StationView.render();
    this.setEventListener();
  },

  setEventListener() {
    Element.stationAddButton.addEventListener(Constant.CLICK, () => {
      this.onClickAddButton();
    });

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

    if (e.target.tagName !== Constant.BUTTON) {
      return;
    }

    if (confirm(ConfirmMessage.CHECK_DELETION)) {
      if (!StationValidation.isValidStatonDeletion(name)) {
        alert(ErrorMessage.STATION_RELATED_LINE);

        return;
      }
      Station.delete(name);
      StationView.render();
    }
  },
};
