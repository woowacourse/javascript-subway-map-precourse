import { Line } from "../model/line.js";
import { Storage } from "../util/storage.js";
import { SectionView } from "../view/section-view.js";

export const SectionManager = {
  isVisited: false,

  init() {
    this.isVisited = true;
    Line.lines = Storage.load(Line.key);
    SectionView.render();
  },

  setEventListener() {},
};
