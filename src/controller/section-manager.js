import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { Constant } from "../util/constant.js";
import { Storage } from "../util/storage.js";
import { Element, ElementControl } from "../view/element.js";
import { SectionView } from "../view/section-view.js";

export const SectionManager = {
  isVisited: false,

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
  },

  onCLickLineButton(e) {
    if (e.target.tagName !== Constant.BUTTON) {
      return false;
    }

    SectionView.renderSectionManager(e);
  },
};
