import { Line } from "../model/line.js";
import { Section } from "../model/section.js";
import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { SectionValidation } from "../util/validation.js";
import { Element, ElementControl } from "../view/element.js";
import { SectionView } from "../view/section-view.js";
import { StationView } from "../view/station-view.js";

export const SectionManager = {
  isVisited: false,
  selectedLine: "",

  init() {
    this.isVisited = true;
    Station.stations = Storage.load(Station.key);
    Line.lines = Storage.load(Line.key);
    SectionView.render();
    this.setEventListener();
  },

  setEventListener() {
    Element.sectionLineMenu.addEventListener(Constant.CLICK, (e) => {
      this.onCLickLineButton(e);
    });

    Element.sectionAddButton.addEventListener(Constant.CLICK, () => {
      this.onClickAddButton();
    });
  },

  onCLickLineButton(e) {
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
      SectionView.renderSectionManager(this.selectedLine);
    }
    ElementControl.clearInput(Element.sectionOrderInupt);
  },
};
