import { Line } from "../model/line.js";
import { Section } from "../model/section.js";
import { Station } from "../model/station.js";
import { ConfirmMessage, Constant, ErrorMessage } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { SectionValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";
import { SectionView } from "../view/section-view.js";

export const SectionManager = {
  isVisited: false,
  selectedLine: "",

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key)
      ? Storage.load(Station.key)
      : [];
    Line.lines = Storage.load(Line.key) ? Storage.load(Line.key) : [];
    SectionView.render();
    this.setEventListener();
  },

  setEventListener() {
    Element.sectionLineMenu.addEventListener(Constant.CLICK, (e) => {
      this.onClickLineButton(e);
    });

    Element.sectionAddButton.addEventListener(Constant.CLICK, () => {
      this.onClickAddButton();
    });

    Element.sectionContainer
      .querySelector(Constant.TBODY)
      .addEventListener(Constant.CLICK, (e) => {
        this.onClickDeleteButton(e);
      });
  },

  onClickLineButton(e) {
    if (e.target.tagName !== Constant.BUTTON) {
      return false;
    }
    this.selectedLine = e.target.dataset.name;
    SectionView.renderSectionManager(this.selectedLine);
  },

  onClickAddButton() {
    const station = Element.sectionStationSelector.value;
    const order = Element.sectionOrderInupt.value;

    if (SectionValidation.isValidSection(station, order, this.selectedLine)) {
      Section.add(station, order, this.selectedLine);
    }
    SectionView.renderSectionManager(this.selectedLine);
    ElementControl.clearInput(Element.sectionOrderInupt);
  },

  onClickDeleteButton(e) {
    const idx = e.target.dataset.idx;

    if (e.target.tagName !== Constant.BUTTON) {
      return;
    }

    if (confirm(ConfirmMessage.CHECK_DELETION_FROM_LINE)) {
      if (!SectionValidation.hasMinimumStations(this.selectedLine)) {
        alert(ErrorMessage.MINIMUM_STATIONS);

        return;
      }
      Section.delete(idx, this.selectedLine);
      SectionView.renderSectionManager(this.selectedLine);
    }
  },
};
